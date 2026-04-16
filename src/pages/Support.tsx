import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

/* ─── Типы ─── */
type TicketStatus = 'open' | 'answered' | 'closed';

interface SupportMessage {
  id: number;
  from: 'user' | 'support';
  text: string;
  time: string;
}

interface Ticket {
  id: number;
  subject: string;
  category: string;
  status: TicketStatus;
  createdAt: string;       // ISO для сортировки
  createdAtLabel: string;  // отображаемое время
  messages: SupportMessage[];
}

/* ─── Константы ─── */
const CATEGORIES = [
  'Технический вопрос',
  'Оплата и тарифы',
  'Проблема с профилем',
  'Жалоба на пользователя',
  'Предложение',
  'Другое',
];

const STATUS_META: Record<TicketStatus, { label: string; color: string; icon: string }> = {
  open:     { label: 'Ожидает ответа', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: 'Clock' },
  answered: { label: 'Есть ответ',     color: 'bg-green-100 text-green-700 border-green-200',   icon: 'MessageCircle' },
  closed:   { label: 'Закрыт',         color: 'bg-muted text-muted-foreground border-border',    icon: 'CheckCircle' },
};

/* ─── Начальные данные ─── */
const INIT_TICKETS: Ticket[] = [
  {
    id: 1,
    subject: 'Не приходит уведомление о новом заказе',
    category: 'Технический вопрос',
    status: 'answered',
    createdAt: '2026-04-15T10:22:00',
    createdAtLabel: '15 апр, 10:22',
    messages: [
      { id: 1, from: 'user', text: 'Добрый день! Уже 2 дня не получаю уведомления о новых заказах. В настройках всё включено.', time: '10:22' },
      { id: 2, from: 'support', text: 'Здравствуйте! Спасибо за обращение. Проверьте, пожалуйста, не попали ли письма в папку "Спам". Также попробуйте переключить уведомления: выключить и включить снова в настройках профиля.', time: '11:05' },
      { id: 3, from: 'user', text: 'Проверил спам — пусто. Переключил уведомления — не помогло.', time: '11:30' },
      { id: 4, from: 'support', text: 'Понял, передаём в технический отдел. Ожидайте ответа в течение 24 часов.', time: '11:45' },
    ],
  },
  {
    id: 2,
    subject: 'Как изменить тариф на Про?',
    category: 'Оплата и тарифы',
    status: 'closed',
    createdAt: '2026-04-10T14:00:00',
    createdAtLabel: '10 апр, 14:00',
    messages: [
      { id: 1, from: 'user', text: 'Хочу перейти на тариф Про. Как это сделать?', time: '14:00' },
      { id: 2, from: 'support', text: 'Добрый день! Перейти на Про можно в разделе "Настройки" → "Подписка" → кнопка "Улучшить тариф". Оплата картой или через СБП.', time: '14:20' },
      { id: 3, from: 'user', text: 'Отлично, нашёл! Спасибо.', time: '14:35' },
    ],
  },
  {
    id: 3,
    subject: 'Фотография в профиле не загружается',
    category: 'Проблема с профилем',
    status: 'open',
    createdAt: '2026-04-17T09:10:00',
    createdAtLabel: '17 апр, 09:10',
    messages: [
      { id: 1, from: 'user', text: 'При попытке загрузить фото в профиль выдаёт ошибку "Файл слишком большой", хотя файл всего 1.2 МБ.', time: '09:10' },
    ],
  },
];

/* ─── Вспомогательные ─── */
const timeNow = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
const sortTickets = (list: Ticket[]) => {
  const open   = list.filter(t => t.status !== 'closed').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const closed = list.filter(t => t.status === 'closed').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return [...open, ...closed];
};

/* ─── Модалка создания тикета ─── */
interface CreateProps { onClose: () => void; onCreate: (t: Ticket) => void }
const CreateTicketModal = ({ onClose, onCreate }: CreateProps) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [firstMsg, setFirstMsg] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!subject.trim() || !category || !firstMsg.trim()) { setError('Заполните все поля'); return; }
    const now = new Date();
    const ticket: Ticket = {
      id: Date.now(),
      subject: subject.trim(),
      category,
      status: 'open',
      createdAt: now.toISOString(),
      createdAtLabel: now.toLocaleString('ru', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      messages: [{ id: 1, from: 'user', text: firstMsg.trim(), time: timeNow() }],
    };
    onCreate(ticket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">Новое обращение</h3>
          <button onClick={onClose}><Icon name="X" size={20} className="text-muted-foreground" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <Icon name="AlertCircle" size={14} />{error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Тема обращения</label>
            <Input placeholder="Кратко опишите проблему..." value={subject} onChange={e => setSubject(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Категория</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    category === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Сообщение</label>
            <Textarea
              placeholder="Опишите вопрос или проблему подробно..."
              rows={5}
              value={firstMsg}
              onChange={e => setFirstMsg(e.target.value)}
            />
          </div>
        </div>

        <div className="p-5 border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Отменить</Button>
          <Button className="flex-1 gradient-purple text-white" onClick={submit}>
            <Icon name="Send" size={15} className="mr-2" />
            Отправить обращение
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ─── Чат тикета ─── */
interface ChatProps { ticket: Ticket; onClose: () => void; onSend: (text: string) => void; onCloseTicket: () => void }
const TicketChat = ({ ticket, onClose, onSend, onCloseTicket }: ChatProps) => {
  const [input, setInput] = useState('');
  const [confirmClose, setConfirmClose] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [ticket.messages.length]);

  const send = () => { if (!input.trim()) return; onSend(input.trim()); setInput(''); };
  const meta = STATUS_META[ticket.status];

  return (
    <div className="flex flex-col h-full">
      {/* Шапка */}
      <div className="px-5 py-3 border-b bg-background">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground md:hidden">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <h3 className="font-semibold text-sm truncate">{ticket.subject}</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-xs border ${meta.color}`}>
                <Icon name={meta.icon} size={11} className="mr-1" />
                {meta.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{ticket.category}</span>
              <span className="text-xs text-muted-foreground">· #{ticket.id}</span>
            </div>
          </div>
          {ticket.status !== 'closed' && (
            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 shrink-0 text-xs" onClick={() => setConfirmClose(true)}>
              <Icon name="CheckCircle" size={14} className="mr-1.5" />
              Вопрос решён
            </Button>
          )}
        </div>
      </div>

      {/* Подтверждение закрытия */}
      {confirmClose && (
        <div className="mx-4 mt-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <Icon name="CheckCircle" size={18} className="text-green-600 shrink-0" />
          <p className="text-sm text-green-700 flex-1">Закрыть тикет? После закрытия ответить нельзя.</p>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shrink-0" onClick={() => { onCloseTicket(); setConfirmClose(false); }}>Да</Button>
          <button onClick={() => setConfirmClose(false)}><Icon name="X" size={16} className="text-muted-foreground" /></button>
        </div>
      )}

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
        {/* Системное сообщение — начало тикета */}
        <div className="text-center">
          <span className="inline-block text-xs text-muted-foreground bg-muted/60 px-3 py-1 rounded-full">
            Обращение #{ticket.id} открыто {ticket.createdAtLabel}
          </span>
        </div>

        {ticket.messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.from === 'support' && (
              <div className="w-7 h-7 rounded-full gradient-purple flex items-center justify-center shrink-0 mb-1">
                <Icon name="Headphones" size={13} className="text-white" />
              </div>
            )}
            <div className={`max-w-[75%] flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.from === 'support' && (
                <span className="text-[11px] text-muted-foreground mb-0.5 ml-1">Служба поддержки</span>
              )}
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'user'
                  ? 'gradient-purple text-white rounded-br-sm'
                  : 'bg-white border shadow-sm text-foreground rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[11px] text-muted-foreground mt-0.5 mx-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {ticket.status === 'closed' && (
          <div className="text-center">
            <span className="inline-block text-xs text-muted-foreground bg-muted/60 px-3 py-1 rounded-full">
              Тикет закрыт
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Поле ввода */}
      {ticket.status !== 'closed' ? (
        <div className="px-4 py-3 border-t flex items-center gap-2 bg-background">
          <Input
            className="flex-1 rounded-full"
            placeholder="Написать в поддержку..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
          />
          <Button size="icon" className="gradient-purple text-white rounded-full shrink-0" onClick={send} disabled={!input.trim()}>
            <Icon name="Send" size={16} />
          </Button>
        </div>
      ) : (
        <div className="px-4 py-3 border-t text-center text-sm text-muted-foreground bg-muted/30">
          Тикет закрыт — переписка завершена
        </div>
      )}
    </div>
  );
};

/* ─── Строка тикета в списке ─── */
interface TicketRowProps { ticket: Ticket; active: boolean; onClick: () => void }
const TicketRow = ({ ticket, active, onClick }: TicketRowProps) => {
  const meta = STATUS_META[ticket.status];
  const lastMsg = ticket.messages[ticket.messages.length - 1];
  const hasUnread = ticket.status === 'answered';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-3 rounded-xl transition-colors border ${
        active
          ? 'bg-primary/8 border-primary/20'
          : 'bg-background hover:bg-muted/50 border-transparent'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          ticket.status === 'closed' ? 'bg-muted' : ticket.status === 'answered' ? 'bg-green-100' : 'bg-orange-100'
        }`}>
          <Icon name={meta.icon} size={15} className={
            ticket.status === 'closed' ? 'text-muted-foreground' : ticket.status === 'answered' ? 'text-green-600' : 'text-orange-600'
          } />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className={`text-sm font-medium leading-tight line-clamp-2 ${active ? 'text-primary' : ''}`}>{ticket.subject}</p>
            {hasUnread && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {lastMsg?.from === 'support' ? '🎧 ' : ''}{lastMsg?.text ?? '—'}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${meta.color}`}>
              {meta.label}
            </span>
            <span className="text-[10px] text-muted-foreground">{ticket.createdAtLabel}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

/* ─── Главная страница ─── */
const Support = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INIT_TICKETS);
  const [activeId, setActiveId] = useState<number | null>(3);
  const [showCreate, setShowCreate] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const sorted = sortTickets(tickets);
  const activeTicket = tickets.find(t => t.id === activeId) ?? null;
  const openCount = tickets.filter(t => t.status !== 'closed').length;

  const openChat = (id: number) => { setActiveId(id); setMobileView('chat'); };

  const sendMessage = (text: string) => {
    if (!activeId) return;
    const newMsg: SupportMessage = { id: Date.now(), from: 'user', text, time: timeNow() };
    setTickets(prev => prev.map(t => t.id === activeId ? { ...t, messages: [...t.messages, newMsg], status: 'open' } : t));

    // Симулируем ответ поддержки через 2с
    setTimeout(() => {
      const reply: SupportMessage = {
        id: Date.now() + 1, from: 'support',
        text: 'Спасибо за сообщение! Мы рассмотрим ваш вопрос и ответим в ближайшее время.',
        time: timeNow(),
      };
      setTickets(prev => prev.map(t => t.id === activeId ? { ...t, messages: [...t.messages, reply], status: 'answered' } : t));
    }, 2000);
  };

  const closeTicket = () => {
    if (!activeId) return;
    setTickets(prev => prev.map(t => t.id === activeId ? { ...t, status: 'closed' } : t));
  };

  const createTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
    setActiveId(ticket.id);
    setShowCreate(false);
    setMobileView('chat');
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in h-[calc(100vh-5rem)] flex flex-col gap-0">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold mb-1">Поддержка</h2>
            <p className="text-muted-foreground text-sm">
              {openCount > 0 ? `${openCount} открытых обращений` : 'Все вопросы решены'}
            </p>
          </div>
          <Button className="gradient-purple text-white" onClick={() => setShowCreate(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Новое обращение
          </Button>
        </div>

        <div className="flex-1 flex rounded-2xl border overflow-hidden bg-background min-h-0">
          {/* ─── Список тикетов ─── */}
          <div className={`w-80 shrink-0 border-r flex flex-col ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-3 border-b">
              <div className="flex items-center gap-2 px-1 py-1">
                {[
                  { icon: 'InboxIcon', label: 'Все', count: tickets.length },
                  { icon: 'Clock', label: 'Открытые', count: openCount },
                  { icon: 'CheckCircle', label: 'Закрытые', count: tickets.length - openCount },
                ].map(tab => (
                  <div key={tab.label} className="flex items-center gap-1 text-xs text-muted-foreground px-2 py-1">
                    <span className="font-medium">{tab.label}</span>
                    <span className="bg-muted px-1.5 py-0.5 rounded-full">{tab.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {/* Открытые */}
              {sorted.filter(t => t.status !== 'closed').length > 0 && (
                <>
                  <p className="text-[11px] uppercase font-semibold text-muted-foreground px-2 pt-1 pb-0.5">Открытые</p>
                  {sorted.filter(t => t.status !== 'closed').map(t => (
                    <TicketRow key={t.id} ticket={t} active={activeId === t.id} onClick={() => openChat(t.id)} />
                  ))}
                </>
              )}
              {/* Закрытые */}
              {sorted.filter(t => t.status === 'closed').length > 0 && (
                <>
                  <p className="text-[11px] uppercase font-semibold text-muted-foreground px-2 pt-3 pb-0.5">Закрытые</p>
                  {sorted.filter(t => t.status === 'closed').map(t => (
                    <TicketRow key={t.id} ticket={t} active={activeId === t.id} onClick={() => openChat(t.id)} />
                  ))}
                </>
              )}
            </div>

            {/* Нижняя подсказка */}
            <div className="p-3 border-t bg-muted/30">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icon name="Info" size={13} className="mt-0.5 shrink-0 text-primary" />
                <p>Обычное время ответа — 1–4 часа в рабочие дни</p>
              </div>
            </div>
          </div>

          {/* ─── Чат тикета ─── */}
          <div className={`flex-1 flex flex-col min-w-0 ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
            {activeTicket ? (
              <TicketChat
                ticket={activeTicket}
                onClose={() => setMobileView('list')}
                onSend={sendMessage}
                onCloseTicket={closeTicket}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center">
                  <Icon name="Headphones" size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">Служба поддержки</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Выберите обращение из списка или создайте новое — мы ответим в течение нескольких часов
                  </p>
                </div>
                <Button className="gradient-purple text-white" onClick={() => setShowCreate(true)}>
                  <Icon name="Plus" size={15} className="mr-2" />
                  Создать обращение
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCreate && <CreateTicketModal onClose={() => setShowCreate(false)} onCreate={createTicket} />}
    </DashboardLayout>
  );
};

export default Support;
