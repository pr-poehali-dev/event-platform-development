import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

/* ─── Типы ─── */
interface Event {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  address: string;
  client: string;
  price: number;
  description: string;
  color: string;
  notify: string; // '1h' | '3h' | '1d' | 'none'
}

/* ─── Константы ─── */
const TODAY = new Date(2026, 3, 16); // 16 апреля 2026 (month 0-based)
const TODAY_STR = fmt(TODAY);

const COLORS = [
  { id: 'purple', label: 'Фиолетовый', bg: 'bg-purple-500', light: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'pink', label: 'Розовый', bg: 'bg-pink-500', light: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'blue', label: 'Синий', bg: 'bg-blue-500', light: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'green', label: 'Зелёный', bg: 'bg-green-500', light: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'orange', label: 'Оранжевый', bg: 'bg-orange-500', light: 'bg-orange-100 text-orange-700 border-orange-200' },
];

const NOTIFY_OPTIONS = [
  { id: 'none', label: 'Без уведомления' },
  { id: '1h', label: 'За 1 час' },
  { id: '3h', label: 'За 3 часа' },
  { id: '1d', label: 'За 1 день' },
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS_RU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function fmt(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function overlaps(a: Event, b: Event): boolean {
  if (a.date !== b.date) return false;
  return toMinutes(a.startTime) < toMinutes(b.endTime) &&
    toMinutes(b.startTime) < toMinutes(a.endTime);
}

/* ─── Начальные данные ─── */
const INITIAL_EVENTS: Event[] = [
  { id: 1, title: 'День рождения Саши', date: '2026-04-17', startTime: '14:00', endTime: '16:00', address: 'Москва, ул. Ленина 14', client: 'Елена Соколова', price: 4500, description: 'Аниматор в костюме Человека-паука, 10 детей 5–9 лет', color: 'purple', notify: '1h' },
  { id: 2, title: 'Корпоратив EventPro', date: '2026-04-20', startTime: '18:00', endTime: '22:00', address: 'СПб, Невский 88', client: 'ООО EventPro', price: 12000, description: 'Ведущий на 50 человек, сцена и микрофон', color: 'blue', notify: '1d' },
  { id: 3, title: 'Юбилей Ирины', date: '2026-04-25', startTime: '19:00', endTime: '21:00', address: 'Москва, Арбат 10', client: 'Ирина Волкова', price: 6000, description: 'Аниматор-клоун на юбилей 50 лет, 20 гостей', color: 'pink', notify: '3h' },
  { id: 4, title: 'Свадьба Петровых', date: '2026-05-10', startTime: '15:00', endTime: '23:00', address: 'Подмосковье, Рублёвка', client: 'Михаил Петров', price: 20000, description: 'DJ + ведущий, 80 гостей', color: 'orange', notify: '1d' },
];

/* ─── Вспомогательные компоненты ─── */
const colorOf = (id: string) => COLORS.find(c => c.id === id) || COLORS[0];

/* ─── Модалка создания / просмотра ─── */
interface ModalProps {
  initialDate?: string;
  event?: Event;
  events: Event[];
  onClose: () => void;
  onSave: (e: Event) => void;
  onDelete?: (id: number) => void;
}

const EventModal = ({ initialDate, event, events, onClose, onSave, onDelete }: ModalProps) => {
  const isView = !!event;
  const [editing, setEditing] = useState(!isView);
  const [form, setForm] = useState<Omit<Event, 'id'>>({
    title: event?.title ?? '',
    date: event?.date ?? initialDate ?? TODAY_STR,
    startTime: event?.startTime ?? '10:00',
    endTime: event?.endTime ?? '12:00',
    address: event?.address ?? '',
    client: event?.client ?? '',
    price: event?.price ?? 0,
    description: event?.description ?? '',
    color: event?.color ?? 'purple',
    notify: event?.notify ?? 'none',
  });
  const [error, setError] = useState('');

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title || !form.date || !form.startTime || !form.endTime) {
      setError('Заполните название, дату и время'); return;
    }
    if (toMinutes(form.startTime) >= toMinutes(form.endTime)) {
      setError('Время окончания должно быть позже начала'); return;
    }
    const draft = { ...form, id: event?.id ?? Date.now() };
    const conflict = events.find(e => e.id !== draft.id && overlaps(e, draft as Event));
    if (conflict) {
      setError(`Пересечение с мероприятием «${conflict.title}» (${conflict.startTime}–${conflict.endTime})`); return;
    }
    onSave(draft as Event);
  };

  const col = colorOf(form.color);
  const d = parseDate(form.date);
  const displayDate = `${d.getDate()} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Шапка */}
        <div className={`rounded-t-2xl p-5 ${col.bg} text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {editing ? (
                <input
                  className="bg-white/20 text-white placeholder:text-white/60 rounded-lg px-3 py-1.5 text-lg font-bold w-full outline-none"
                  placeholder="Название мероприятия"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                />
              ) : (
                <h3 className="text-xl font-bold">{form.title}</h3>
              )}
              <p className="text-white/80 text-sm mt-1">{displayDate} · {form.startTime}–{form.endTime}</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white ml-3 mt-0.5">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Тело */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <Icon name="AlertCircle" size={15} />
              {error}
            </div>
          )}

          {editing ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5 col-span-3">
                  <Label>Дата</Label>
                  <Input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Начало</Label>
                  <Input type="time" value={form.startTime} onChange={e => set('startTime', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Конец</Label>
                  <Input type="time" value={form.endTime} onChange={e => set('endTime', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Цена (₽)</Label>
                  <Input type="number" placeholder="0" value={form.price || ''} onChange={e => set('price', Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Адрес</Label>
                <Input placeholder="Город, улица, дом" value={form.address} onChange={e => set('address', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Клиент</Label>
                <Input placeholder="Имя или организация" value={form.client} onChange={e => set('client', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Описание</Label>
                <Textarea placeholder="Детали мероприятия..." rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Цвет</Label>
                <div className="flex gap-2">
                  {COLORS.map(c => (
                    <button key={c.id} onClick={() => set('color', c.id)}
                      className={`w-7 h-7 rounded-full ${c.bg} transition-all ${form.color === c.id ? 'ring-2 ring-offset-2 ring-foreground/30 scale-110' : ''}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Уведомление</Label>
                <div className="flex flex-wrap gap-2">
                  {NOTIFY_OPTIONS.map(n => (
                    <button key={n.id} onClick={() => set('notify', n.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        form.notify === n.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}>
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-sm">
              {[
                { icon: 'Clock', label: 'Время', val: `${form.startTime} – ${form.endTime}` },
                { icon: 'MapPin', label: 'Адрес', val: form.address || '—' },
                { icon: 'User', label: 'Клиент', val: form.client || '—' },
                { icon: 'DollarSign', label: 'Стоимость', val: form.price ? `${form.price.toLocaleString()} ₽` : '—' },
                { icon: 'Bell', label: 'Уведомление', val: NOTIFY_OPTIONS.find(n => n.id === form.notify)?.label || '—' },
              ].map(row => (
                <div key={row.icon} className="flex items-start gap-3">
                  <Icon name={row.icon} size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="font-medium">{row.val}</p>
                  </div>
                </div>
              ))}
              {form.description && (
                <div className="flex items-start gap-3">
                  <Icon name="FileText" size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Описание</p>
                    <p className="leading-relaxed text-foreground/80">{form.description}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Кнопки */}
        <div className="p-5 border-t flex gap-2">
          {isView && !editing && (
            <>
              <Button variant="outline" className="flex-1" onClick={() => setEditing(true)}>
                <Icon name="Edit" size={15} className="mr-2" />Редактировать
              </Button>
              {onDelete && (
                <Button variant="destructive" size="icon" onClick={() => onDelete(event!.id)}>
                  <Icon name="Trash2" size={15} />
                </Button>
              )}
            </>
          )}
          {editing && (
            <>
              <Button variant="outline" className="flex-1" onClick={isView ? () => setEditing(false) : onClose}>Отменить</Button>
              <Button className="flex-1 gradient-purple text-white" onClick={handleSave}>
                <Icon name="Check" size={15} className="mr-2" />Сохранить
              </Button>
            </>
          )}
          {isView && !editing && (
            <Button variant="outline" onClick={onClose} className="flex-1">Закрыть</Button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Основная страница ─── */
const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [viewMonth, setViewMonth] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [modal, setModal] = useState<{ mode: 'create' | 'view'; date?: string; event?: Event } | null>(null);
  const [pickingDay, setPickingDay] = useState(false);

  /* Ячейки месяца */
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Пн
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const maxDate = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, TODAY.getDate()); // +1 месяц

  const eventsForDay = (dateStr: string) => events.filter(e => e.date === dateStr);

  const handleDayClick = (dateStr: string) => {
    if (pickingDay) {
      setPickingDay(false);
      setModal({ mode: 'create', date: dateStr });
      return;
    }
    setSelectedDay(prev => prev === dateStr ? null : dateStr);
  };

  const saveEvent = (ev: Event) => {
    setEvents(prev => {
      const idx = prev.findIndex(e => e.id === ev.id);
      return idx >= 0 ? prev.map(e => e.id === ev.id ? ev : e) : [ev, ...prev];
    });
    setModal(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setModal(null);
  };

  /* Навигация по месяцам (только в диапазоне текущий + 1) */
  const canPrev = !(viewMonth.getFullYear() === TODAY.getFullYear() && viewMonth.getMonth() === TODAY.getMonth());
  const canNext = !(viewMonth.getFullYear() === maxDate.getFullYear() && viewMonth.getMonth() === maxDate.getMonth());

  const todayWeekday = WEEKDAYS[(TODAY.getDay() + 6) % 7];

  return (
    <DashboardLayout>
      <div className="max-w-3xl animate-fade-in space-y-6">

        {/* Заголовок */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold mb-1">Календарь</h2>
            <p className="text-muted-foreground">Мои мероприятия</p>
          </div>
          <Button
            className={`${pickingDay ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'gradient-purple text-white'}`}
            onClick={() => setPickingDay(!pickingDay)}
          >
            <Icon name={pickingDay ? 'X' : 'Plus'} size={16} className="mr-2" />
            {pickingDay ? 'Отмена — выберите день' : 'Запланировать мероприятие'}
          </Button>
        </div>

        {pickingDay && (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700">
            <Icon name="MousePointerClick" size={16} />
            Нажмите на день в календаре, чтобы добавить мероприятие
          </div>
        )}

        {/* Сегодня */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/10">
          <div className="w-14 h-14 rounded-xl gradient-purple flex flex-col items-center justify-center text-white">
            <span className="text-xs font-medium opacity-80 uppercase">{todayWeekday}</span>
            <span className="text-2xl font-bold leading-none">{TODAY.getDate()}</span>
          </div>
          <div>
            <p className="font-semibold">Сегодня, {TODAY.getDate()} {MONTHS_GEN[TODAY.getMonth()]} {TODAY.getFullYear()}</p>
            <p className="text-sm text-muted-foreground">
              {eventsForDay(TODAY_STR).length === 0
                ? 'Мероприятий сегодня нет'
                : `${eventsForDay(TODAY_STR).length} мероприятие сегодня`}
            </p>
          </div>
          {eventsForDay(TODAY_STR).map(ev => (
            <Badge key={ev.id} className={`${colorOf(ev.color).light} border text-xs ml-auto`}>
              {ev.startTime} {ev.title}
            </Badge>
          ))}
        </div>

        {/* Навигация по месяцу */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => canPrev && setViewMonth(new Date(year, month - 1, 1))}
            className={`p-2 rounded-lg transition-colors ${canPrev ? 'hover:bg-muted' : 'opacity-30 cursor-default'}`}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <h3 className="text-lg font-bold">{MONTHS_RU[month]} {year}</h3>
          <button
            onClick={() => canNext && setViewMonth(new Date(year, month + 1, 1))}
            className={`p-2 rounded-lg transition-colors ${canNext ? 'hover:bg-muted' : 'opacity-30 cursor-default'}`}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
          ))}

          {/* Пустые ячейки */}
          {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}

          {/* Дни */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = eventsForDay(dateStr);
            const isToday = dateStr === TODAY_STR;
            const isPast = dateStr < TODAY_STR;
            const isSelected = selectedDay === dateStr;
            const isFuture = dateStr > fmt(maxDate);

            return (
              <div key={day} className="flex flex-col">
                <button
                  onClick={() => !isFuture && handleDayClick(dateStr)}
                  className={`
                    relative rounded-xl p-2 text-sm font-medium transition-all text-left min-h-[64px] border
                    ${isFuture ? 'opacity-30 cursor-default bg-muted/30 border-transparent' : ''}
                    ${!isFuture && dayEvents.length === 0 && !isToday ? 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted' : ''}
                    ${isToday ? 'border-primary/30 bg-primary/5' : ''}
                    ${isSelected ? 'ring-2 ring-primary shadow-md' : ''}
                    ${pickingDay && !isFuture ? 'hover:ring-2 hover:ring-orange-400 cursor-pointer' : ''}
                  `}
                >
                  <span className={`text-xs font-bold ${isToday ? 'text-primary' : ''}`}>{day}</span>
                  {isToday && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={`w-full rounded-md px-1 py-0.5 text-[10px] font-medium truncate border ${colorOf(ev.color).light}`}>
                        {ev.startTime} {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-muted-foreground pl-1">+{dayEvents.length - 2} ещё</div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Раскрывающийся список мероприятий дня */}
        {selectedDay && (() => {
          const dayEvs = eventsForDay(selectedDay);
          const d = parseDate(selectedDay);
          return (
            <div className="rounded-2xl border bg-card overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b">
                <h4 className="font-semibold text-sm">
                  {d.getDate()} {MONTHS_GEN[d.getMonth()]} {d.getFullYear()}
                </h4>
                <button onClick={() => setSelectedDay(null)}>
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
              </div>
              {dayEvs.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Мероприятий нет.{' '}
                  <button className="text-primary underline" onClick={() => setModal({ mode: 'create', date: selectedDay })}>
                    Добавить?
                  </button>
                </div>
              ) : (
                <div className="divide-y">
                  {dayEvs.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(ev => (
                    <button
                      key={ev.id}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                      onClick={() => setModal({ mode: 'view', event: ev })}
                    >
                      <div className={`w-2 h-10 rounded-full shrink-0 ${colorOf(ev.color).bg}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{ev.title}</p>
                        <p className="text-xs text-muted-foreground">{ev.startTime}–{ev.endTime} · {ev.address || 'Без адреса'}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary shrink-0">{ev.price ? `${ev.price.toLocaleString()} ₽` : ''}</p>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              )}
              <div className="px-4 py-3 border-t">
                <Button size="sm" variant="outline" className="w-full" onClick={() => setModal({ mode: 'create', date: selectedDay })}>
                  <Icon name="Plus" size={14} className="mr-1.5" />
                  Добавить мероприятие на этот день
                </Button>
              </div>
            </div>
          );
        })()}

        {/* Предстоящие */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Ближайшие мероприятия</h3>
          {events
            .filter(ev => ev.date >= TODAY_STR)
            .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
            .slice(0, 5)
            .map(ev => {
              const d = parseDate(ev.date);
              return (
                <button
                  key={ev.id}
                  className="w-full flex items-center gap-4 p-3 rounded-xl border bg-card hover:shadow-md transition-all text-left group"
                  onClick={() => setModal({ mode: 'view', event: ev })}
                >
                  <div className={`w-12 h-12 rounded-xl ${colorOf(ev.color).bg} flex flex-col items-center justify-center text-white shrink-0`}>
                    <span className="text-xs opacity-80">{MONTHS_GEN[d.getMonth()].slice(0, 3)}</span>
                    <span className="text-lg font-bold leading-none">{d.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{ev.startTime}–{ev.endTime} · {ev.client || 'Без клиента'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {ev.price > 0 && <p className="font-bold text-primary text-sm">{ev.price.toLocaleString()} ₽</p>}
                    {ev.notify !== 'none' && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Icon name="Bell" size={11} />
                        {NOTIFY_OPTIONS.find(n => n.id === ev.notify)?.label}
                      </p>
                    )}
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              );
            })}
          {events.filter(ev => ev.date >= TODAY_STR).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Нет запланированных мероприятий</p>
          )}
        </div>
      </div>

      {/* Модалка */}
      {modal && (
        <EventModal
          initialDate={modal.date}
          event={modal.event}
          events={events}
          onClose={() => setModal(null)}
          onSave={saveEvent}
          onDelete={modal.event ? deleteEvent : undefined}
        />
      )}
    </DashboardLayout>
  );
};

export default CalendarPage;
