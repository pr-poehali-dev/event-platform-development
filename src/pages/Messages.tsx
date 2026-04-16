import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

/* ─── Типы ─── */
interface Reaction { emoji: string; from: 'me' | 'them' }
interface MsgVersion { text: string; at: string }
interface Message {
  id: number;
  from: 'me' | 'them';
  text: string;
  time: string;
  read: boolean;
  reactions: Reaction[];
  versions: MsgVersion[];     // история правок
  editCount: number;
  replyTo?: number;           // id сообщения-цитаты
  forwarded?: boolean;
}
interface Chat {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline';
  lastSeen: string;
  pinned: boolean;
  unread: number;
  messages: Message[];
}

/* ─── Константы ─── */
const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
const ME_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna';

/* ─── Данные ─── */
const INIT_CHATS: Chat[] = [
  {
    id: '1', name: 'Мария К.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'Заказчик', status: 'online', lastSeen: 'Онлайн', pinned: true, unread: 2,
    messages: [
      { id: 1, from: 'them', text: 'Здравствуйте! Хотим заказать праздник для ребёнка.', time: '14:20', read: true, reactions: [], versions: [], editCount: 0 },
      { id: 2, from: 'me',   text: 'Добрый день! Расскажите подробнее — возраст, дата, количество детей?', time: '14:22', read: true, reactions: [], versions: [], editCount: 0 },
      { id: 3, from: 'them', text: 'Сыну 7 лет, 25 апреля, около 10 детей.', time: '14:23', read: true, reactions: [{ emoji: '👍', from: 'me' }], versions: [], editCount: 0 },
      { id: 4, from: 'them', text: 'Спасибо, всё было отлично!', time: '14:30', read: false, reactions: [], versions: [], editCount: 0 },
      { id: 5, from: 'them', text: 'Когда вы сможете приехать снова?', time: '14:31', read: false, reactions: [], versions: [], editCount: 0 },
    ],
  },
  {
    id: '2', name: 'Сергей П.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
    role: 'Заказчик', status: 'online', lastSeen: 'Онлайн', pinned: true, unread: 1,
    messages: [
      { id: 1, from: 'them', text: 'Можете провести мероприятие 18 мая?', time: '13:10', read: false, reactions: [], versions: [], editCount: 0 },
    ],
  },
  {
    id: '3', name: 'Анастасия Л.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anastasia',
    role: 'Заказчик', status: 'offline', lastSeen: 'Был(а) 2 часа назад', pinned: false, unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Какая стоимость дополнительного часа?', time: '11:00', read: true, reactions: [], versions: [], editCount: 0 },
      { id: 2, from: 'me',   text: '+1500₽ за каждый дополнительный час.', time: '11:05', read: true, reactions: [], versions: [], editCount: 0 },
    ],
  },
  {
    id: '4', name: 'Дмитрий И.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    role: 'Агентство', status: 'offline', lastSeen: 'Вчера в 18:30', pinned: false, unread: 0,
    messages: [
      { id: 1, from: 'me',   text: 'Конечно, всегда готов помочь!', time: 'Вчера', read: true, reactions: [], versions: [], editCount: 0 },
    ],
  },
  {
    id: '5', name: 'Елена В.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaV',
    role: 'Заказчик', status: 'offline', lastSeen: '2 дня назад', pinned: false, unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Отлично, жду с нетерпением!', time: '2 дня', read: true, reactions: [], versions: [], editCount: 0 },
    ],
  },
];

/* ─── Вспомогательные ─── */
const timeNow = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
const lastMsg = (c: Chat) => {
  const m = c.messages[c.messages.length - 1];
  if (!m) return '';
  return (m.from === 'me' ? 'Вы: ' : '') + m.text;
};

/* ─── Контекстное меню ─── */
interface CtxMenuProps {
  x: number; y: number;
  msg: Message;
  onClose: () => void;
  onReact: (emoji: string) => void;
  onEdit: () => void;
  onReply: () => void;
  onForward: () => void;
  onHistory: () => void;
  onReport: () => void;
}
const ContextMenu = ({ x, y, msg, onClose, onReact, onEdit, onReply, onForward, onHistory, onReport }: CtxMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Корректируем позицию чтобы не выходило за экран
  const left = Math.min(x, window.innerWidth - 220);
  const top  = Math.min(y, window.innerHeight - 320);

  return (
    <div ref={ref} className="fixed z-[200] bg-background border rounded-2xl shadow-2xl w-52 overflow-hidden" style={{ left, top }}>
      {/* Реакции */}
      <div className="flex items-center justify-around px-3 py-2.5 border-b">
        {REACTIONS.map(e => (
          <button key={e} onClick={() => { onReact(e); onClose(); }}
            className="text-xl hover:scale-125 transition-transform">{e}</button>
        ))}
      </div>
      {/* Действия */}
      {[
        { icon: 'Reply',      label: 'Ответить',           fn: onReply },
        { icon: 'Forward',    label: 'Переслать',           fn: onForward },
        ...(msg.from === 'me' && msg.editCount < 3
          ? [{ icon: 'Pencil', label: `Изменить (${3 - msg.editCount} осталось)`, fn: onEdit }]
          : []),
        ...(msg.versions.length > 0
          ? [{ icon: 'History', label: 'История правок', fn: onHistory }]
          : []),
        { icon: 'Flag',       label: 'Пожаловаться',        fn: onReport },
      ].map(item => (
        <button key={item.label} onClick={() => { item.fn(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left">
          <Icon name={item.icon} size={15} className="text-muted-foreground" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

/* ─── Модалка жалобы ─── */
const ReportModal = ({ name, onClose }: { name: string; onClose: () => void }) => {
  const reasons = ['Спам', 'Оскорбления', 'Мошенничество', 'Неуместный контент', 'Другое'];
  const [selected, setSelected] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        {sent ? (
          <div className="text-center space-y-3">
            <Icon name="CheckCircle" size={40} className="text-green-500 mx-auto" />
            <p className="font-semibold">Жалоба отправлена</p>
            <p className="text-sm text-muted-foreground">Мы рассмотрим её в течение 48 часов.</p>
            <Button className="w-full" onClick={onClose}>Закрыть</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Пожаловаться на {name}</h3>
              <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-2">
              {reasons.map(r => (
                <button key={r} onClick={() => setSelected(r)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${selected === r ? 'border-primary bg-primary/5 font-medium' : 'border-border hover:border-primary/40'}`}>
                  {r}
                </button>
              ))}
            </div>
            <Button className="w-full gradient-purple text-white" disabled={!selected} onClick={() => setSent(true)}>
              Отправить жалобу
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Модалка истории правок ─── */
const HistoryModal = ({ versions, onClose }: { versions: MsgVersion[]; onClose: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">История правок</h3>
        <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
      </div>
      <div className="space-y-3">
        {versions.map((v, i) => (
          <div key={i} className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">Версия {i + 1} · {v.at}</p>
            <p className="text-sm">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Модалка пересылки ─── */
const ForwardModal = ({ chats, msg, onForward, onClose }: { chats: Chat[]; msg: Message; onForward: (chatId: string) => void; onClose: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Переслать сообщение</h3>
        <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
      </div>
      <div className="bg-muted/40 rounded-xl p-3 text-sm text-muted-foreground line-clamp-2">{msg.text}</div>
      <div className="space-y-1 max-h-60 overflow-y-auto">
        {chats.map(c => (
          <button key={c.id} onClick={() => { onForward(c.id); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left">
            <Avatar className="w-9 h-9"><AvatarImage src={c.avatar} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
            <span className="text-sm font-medium">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Пузырёк сообщения ─── */
interface BubbleProps {
  msg: Message;
  allMessages: Message[];
  onContextMenu: (e: React.MouseEvent, msg: Message) => void;
}
const Bubble = ({ msg, allMessages, onContextMenu }: BubbleProps) => {
  const isMe = msg.from === 'me';
  const replyMsg = msg.replyTo ? allMessages.find(m => m.id === msg.replyTo) : null;

  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isMe && (
        <Avatar className="w-7 h-7 shrink-0 mb-1">
          <AvatarFallback className="text-xs">М</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[72%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        {/* Цитата */}
        {replyMsg && (
          <div className={`mb-1 px-3 py-1.5 rounded-xl border-l-4 bg-muted/60 text-xs text-muted-foreground max-w-full truncate ${isMe ? 'border-primary' : 'border-secondary'}`}>
            {replyMsg.from === 'me' ? 'Вы' : 'Собеседник'}: {replyMsg.text}
          </div>
        )}
        {/* Пузырь */}
        <div
          onContextMenu={e => { e.preventDefault(); onContextMenu(e, msg); }}
          className={`relative px-4 py-2.5 rounded-2xl cursor-pointer select-text group ${
            isMe
              ? 'gradient-purple text-white rounded-br-sm'
              : 'bg-white border shadow-sm text-foreground rounded-bl-sm'
          } ${msg.forwarded ? 'opacity-90' : ''}`}
        >
          {msg.forwarded && (
            <p className={`text-[10px] mb-1 flex items-center gap-1 ${isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
              <Icon name="Forward" size={10} /> Пересланное сообщение
            </p>
          )}
          <p className="text-sm leading-relaxed">{msg.text}</p>
          {msg.editCount > 0 && (
            <span className={`text-[10px] ${isMe ? 'text-white/60' : 'text-muted-foreground'}`}>(изм.)</span>
          )}
        </div>
        {/* Реакции */}
        {msg.reactions.length > 0 && (
          <div className="flex gap-0.5 mt-1 flex-wrap">
            {Object.entries(msg.reactions.reduce((acc, r) => { acc[r.emoji] = (acc[r.emoji] || 0) + 1; return acc; }, {} as Record<string, number>))
              .map(([emoji, count]) => (
                <span key={emoji} className="text-sm bg-white border rounded-full px-1.5 py-0.5 shadow-sm">{emoji}{count > 1 && <span className="text-xs ml-0.5 text-muted-foreground">{count}</span>}</span>
              ))}
          </div>
        )}
        {/* Время + статус */}
        <div className={`flex items-center gap-1 mt-0.5 ${isMe ? 'flex-row-reverse' : ''}`}>
          <span className="text-[11px] text-muted-foreground">{msg.time}</span>
          {isMe && (
            <Icon name={msg.read ? 'CheckCheck' : 'Check'} size={13} className={msg.read ? 'text-primary' : 'text-muted-foreground'} />
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Основная страница ─── */
const Messages = () => {
  const [chats, setChats] = useState<Chat[]>(INIT_CHATS);
  const [activeId, setActiveId] = useState<string | null>('1');
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [editingMsg, setEditingMsg] = useState<Message | null>(null);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; msg: Message } | null>(null);
  const [historyMsg, setHistoryMsg] = useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = useState<Message | null>(null);
  const [reportChat, setReportChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = chats.find(c => c.id === activeId) ?? null;
  const pinnedChats = chats.filter(c => c.pinned);
  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);

  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeId, active?.messages.length]);

  /* Выбор чата — сбрасываем непрочитанные */
  const openChat = (id: string) => {
    setActiveId(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c));
  };

  /* Закрепить / открепить */
  const togglePin = (id: string) => {
    const pins = chats.filter(c => c.pinned && c.id !== id).length;
    setChats(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (!c.pinned && pins >= 3) return c; // max 3
      return { ...c, pinned: !c.pinned };
    }));
  };

  /* Отправить / сохранить */
  const send = () => {
    if (!input.trim() || !active) return;

    if (editingMsg) {
      setChats(prev => prev.map(c => c.id === activeId ? {
        ...c, messages: c.messages.map(m => m.id === editingMsg.id ? {
          ...m,
          text: input,
          editCount: m.editCount + 1,
          versions: [...m.versions, { text: m.text, at: timeNow() }],
        } : m),
      } : c));
      setEditingMsg(null);
    } else {
      const msg: Message = {
        id: Date.now(), from: 'me', text: input, time: timeNow(),
        read: false, reactions: [], versions: [], editCount: 0,
        replyTo: replyTo?.id,
      };
      setChats(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c));
      setReplyTo(null);
    }
    setInput('');
  };

  /* Реакция */
  const addReaction = (msgId: number, emoji: string) => {
    setChats(prev => prev.map(c => c.id !== activeId ? c : {
      ...c, messages: c.messages.map(m => {
        if (m.id !== msgId) return m;
        const exists = m.reactions.find(r => r.emoji === emoji && r.from === 'me');
        return {
          ...m, reactions: exists
            ? m.reactions.filter(r => !(r.emoji === emoji && r.from === 'me'))
            : [...m.reactions, { emoji, from: 'me' }],
        };
      }),
    }));
  };

  /* Переслать */
  const forwardTo = (targetId: string, msg: Message) => {
    const fwd: Message = { ...msg, id: Date.now(), from: 'me', forwarded: true, replyTo: undefined, time: timeNow(), read: false };
    setChats(prev => prev.map(c => c.id === targetId ? { ...c, messages: [...c.messages, fwd] } : c));
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in h-[calc(100vh-5rem)] flex gap-0 rounded-2xl border overflow-hidden bg-background">

        {/* ─── Список чатов ─── */}
        <div className="w-72 shrink-0 flex flex-col border-r">
          {/* Шапка */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">Чаты</h2>
                {totalUnread > 0 && (
                  <Badge className="gradient-purple text-white border-0 text-xs px-2">{totalUnread}</Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{chats.length} чатов</span>
            </div>
            <div className="relative">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск..." className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          {/* Закреплённые */}
          {!search && pinnedChats.length > 0 && (
            <div className="px-3 pt-3">
              <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-2 px-1">Закреплённые</p>
              {pinnedChats.map(c => (
                <ChatRow key={c.id} chat={c} active={activeId === c.id} onOpen={openChat} onPin={togglePin} onReport={setReportChat} />
              ))}
              <div className="h-px bg-border my-2" />
            </div>
          )}

          {/* Все чаты */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
            {filtered.filter(c => !c.pinned || !!search).map(c => (
              <ChatRow key={c.id} chat={c} active={activeId === c.id} onOpen={openChat} onPin={togglePin} onReport={setReportChat} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">Чаты не найдены</div>
            )}
          </div>
        </div>

        {/* ─── Область чата ─── */}
        {active ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Шапка чата */}
            <div className="flex items-center gap-3 px-5 py-3 border-b bg-background">
              <Avatar className="w-10 h-10">
                <AvatarImage src={active.avatar} />
                <AvatarFallback>{active.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{active.name}</p>
                <div className="flex items-center gap-1.5">
                  {active.status === 'online'
                    ? <><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /><span className="text-xs text-green-600">Онлайн</span></>
                    : <span className="text-xs text-muted-foreground">Был(а) {active.lastSeen}</span>}
                </div>
              </div>
              <button onClick={() => setReportChat(active)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors" title="Пожаловаться">
                <Icon name="Flag" size={17} />
              </button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-muted/20">
              {active.messages.map(msg => (
                <Bubble
                  key={msg.id}
                  msg={msg}
                  allMessages={active.messages}
                  onContextMenu={(e, m) => setCtxMenu({ x: e.clientX, y: e.clientY, msg: m })}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Цитата / редактирование */}
            {(replyTo || editingMsg) && (
              <div className="flex items-center gap-3 px-4 py-2 border-t bg-primary/5">
                <Icon name={editingMsg ? 'Pencil' : 'Reply'} size={15} className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-primary">{editingMsg ? 'Редактирование' : 'Ответ'}</p>
                  <p className="text-xs text-muted-foreground truncate">{editingMsg?.text ?? replyTo?.text}</p>
                </div>
                <button onClick={() => { setReplyTo(null); setEditingMsg(null); setInput(''); }}>
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
              </div>
            )}

            {/* Поле ввода */}
            <div className="px-4 py-3 border-t flex items-center gap-2 bg-background">
              <Input
                className="flex-1 rounded-full"
                placeholder="Написать сообщение..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              />
              <Button
                size="icon"
                className="gradient-purple text-white rounded-full shrink-0"
                onClick={send}
                disabled={!input.trim()}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Выберите чат
          </div>
        )}
      </div>

      {/* ─── Контекстное меню ─── */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x} y={ctxMenu.y} msg={ctxMenu.msg}
          onClose={() => setCtxMenu(null)}
          onReact={emoji => addReaction(ctxMenu.msg.id, emoji)}
          onEdit={() => { setEditingMsg(ctxMenu.msg); setInput(ctxMenu.msg.text); }}
          onReply={() => setReplyTo(ctxMenu.msg)}
          onForward={() => setForwardMsg(ctxMenu.msg)}
          onHistory={() => setHistoryMsg(ctxMenu.msg)}
          onReport={() => setReportChat(active)}
        />
      )}

      {historyMsg && <HistoryModal versions={historyMsg.versions} onClose={() => setHistoryMsg(null)} />}
      {forwardMsg && active && (
        <ForwardModal chats={chats} msg={forwardMsg}
          onForward={id => forwardTo(id, forwardMsg)}
          onClose={() => setForwardMsg(null)} />
      )}
      {reportChat && <ReportModal name={reportChat.name} onClose={() => setReportChat(null)} />}
    </DashboardLayout>
  );
};

/* ─── Строка чата ─── */
interface ChatRowProps { chat: Chat; active: boolean; onOpen: (id: string) => void; onPin: (id: string) => void; onReport: (c: Chat) => void }
const ChatRow = ({ chat, active, onOpen, onPin, onReport }: ChatRowProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer transition-colors relative group ${active ? 'bg-primary/8 border border-primary/15' : 'hover:bg-muted/60'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(chat.id)}
    >
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        {chat.status === 'online' && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold truncate">{chat.name}</span>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-1">
            {chat.messages[chat.messages.length - 1]?.time ?? ''}
          </span>
        </div>
        <p className={`text-xs truncate ${chat.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          {lastMsg(chat)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        {chat.unread > 0 && (
          <Badge className="gradient-purple text-white border-0 text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center">
            {chat.unread}
          </Badge>
        )}
        {chat.pinned && <Icon name="Pin" size={12} className="text-primary" />}
      </div>
      {/* Кнопки при наведении */}
      {hover && (
        <div className="absolute right-2 top-2 flex gap-0.5 bg-background rounded-lg border shadow-sm">
          <button
            onClick={e => { e.stopPropagation(); onPin(chat.id); }}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            title={chat.pinned ? 'Открепить' : 'Закрепить'}
          >
            <Icon name={chat.pinned ? 'PinOff' : 'Pin'} size={13} className="text-muted-foreground" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onReport(chat); }}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            title="Пожаловаться"
          >
            <Icon name="Flag" size={13} className="text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Messages;
