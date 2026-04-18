import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import CreateOrderModal from '@/components/CreateOrderModal';
import CreateSearchModal from '@/components/CreateSearchModal';
import { MOCK_SEARCH_REQUESTS, CATEGORY_COLOR } from '@/data/searchRequests';
import type { SearchRequest } from '@/data/searchRequests';

const PERFORMER_TYPES = ['Все', 'Аниматор', 'Ведущий', 'Фокусник', 'DJ', 'Певец', 'Фотограф', 'Танцор'];
const GENDER_OPTIONS = ['Все', 'М', 'Ж', 'Не важно'];
const SORT_OPTIONS = [
  { id: 'date', label: 'По дате' },
  { id: 'price_asc', label: 'Цена ↑' },
  { id: 'price_desc', label: 'Цена ↓' },
];
const SEARCH_CATEGORIES = ['Все', 'Реквизит', 'Костюм', 'Оборудование', 'Декор', 'Свет/Звук', 'Другое'];

export interface Order {
  id: number;
  title: string;
  cover?: string;
  author: { name: string; avatar: string; id: number };
  price: number;
  address: string;
  date: string;
  startTime: string;
  arriveTime: string;
  duration: string;
  performerType: string;
  gender: 'М' | 'Ж' | 'Не важно';
  description: string;
  createdAt: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    title: 'Человек-паук на день рождения',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
    author: { name: 'Елена Соколова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sokolova', id: 10 },
    price: 4500,
    address: 'Москва, ул. Ленина 14, кв. 32',
    date: '25 апреля 2025',
    startTime: '14:00',
    arriveTime: '13:45',
    duration: '2 часа',
    performerType: 'Аниматор',
    gender: 'М',
    description: 'Нужен аниматор в костюме Человека-паука на день рождения сына (7 лет). Желательно с реквизитом, играми и активностями для детей 5–9 лет. Будет около 10 детей.',
    createdAt: '2025-04-16',
  },
  {
    id: 2,
    title: 'Ведущий на корпоратив',
    author: { name: 'ООО «Ромашка»', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Company', id: 11 },
    price: 12000,
    address: 'Санкт-Петербург, Невский пр. 88',
    date: '1 мая 2025',
    startTime: '18:00',
    arriveTime: '17:30',
    duration: '4 часа',
    performerType: 'Ведущий',
    gender: 'Не важно',
    description: 'Корпоратив на 50 человек. Нужен энергичный ведущий, который проведёт конкурсы, игры и интерактивы. Есть сцена и микрофон.',
    createdAt: '2025-04-15',
  },
  {
    id: 3,
    title: 'DJ на свадьбу',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
    author: { name: 'Михаил Петров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petrov', id: 12 },
    price: 8000,
    address: 'Москва, Рублёвское ш. 20',
    date: '10 мая 2025',
    startTime: '17:00',
    arriveTime: '16:00',
    duration: '6 часов',
    performerType: 'DJ',
    gender: 'М',
    description: 'Свадьба на 80 гостей. Нужен DJ с собственной аппаратурой. Предпочтение живого звука, переходы без пауз. Плейлист согласуем заранее.',
    createdAt: '2025-04-14',
  },
  {
    id: 4,
    title: 'Фокусник на выпускной',
    author: { name: 'Школа №43', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=School', id: 13 },
    price: 5000,
    address: 'Казань, ул. Пушкина 7',
    date: '20 мая 2025',
    startTime: '16:00',
    arriveTime: '15:45',
    duration: '1.5 часа',
    performerType: 'Фокусник',
    gender: 'Не важно',
    description: '11 класс, выпускной вечер. Ищем фокусника или иллюзиониста на 30–40 минут шоу. Аудитория — дети 16–17 лет и их родители.',
    createdAt: '2025-04-13',
  },
  {
    id: 5,
    title: 'Певица на юбилей',
    cover: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600',
    author: { name: 'Ирина Волкова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Volkova', id: 14 },
    price: 6500,
    address: 'Екатеринбург, пр. Ленина 44',
    date: '3 мая 2025',
    startTime: '19:00',
    arriveTime: '18:30',
    duration: '2 часа',
    performerType: 'Певец',
    gender: 'Ж',
    description: 'Юбилей мамы — 50 лет. Камерное мероприятие, 20 гостей. Нужна певица с живым вокалом. Предпочтение — лирика, ретро, романсы.',
    createdAt: '2025-04-12',
  },
];

const GENDER_COLOR: Record<string, string> = {
  'М': 'bg-blue-100 text-blue-700',
  'Ж': 'bg-pink-100 text-pink-700',
  'Не важно': 'bg-muted text-muted-foreground',
};

const TYPE_COLOR: Record<string, string> = {
  'Аниматор': 'bg-purple-100 text-purple-700',
  'Ведущий': 'bg-orange-100 text-orange-700',
  'DJ': 'bg-indigo-100 text-indigo-700',
  'Фокусник': 'bg-yellow-100 text-yellow-700',
  'Певец': 'bg-pink-100 text-pink-700',
  'Фотограф': 'bg-green-100 text-green-700',
  'Танцор': 'bg-teal-100 text-teal-700',
};

const OrderCard = ({ order, onOpenChat }: { order: Order; onOpenChat: (o: Order) => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border bg-card overflow-hidden transition-all duration-300 cursor-pointer group ${expanded ? 'shadow-lg ring-1 ring-primary/20' : 'hover:shadow-md hover:-translate-y-0.5'}`}
    >
      <div onClick={() => setExpanded(!expanded)}>
        {order.cover && !expanded && (
          <div className="h-36 overflow-hidden">
            <img src={order.cover} alt={order.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        {order.cover && expanded && (
          <div className="h-48 overflow-hidden">
            <img src={order.cover} alt={order.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className={`p-4 ${expanded ? 'pb-2' : ''}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <Badge className={`text-xs font-medium border-0 ${TYPE_COLOR[order.performerType] || 'bg-muted text-muted-foreground'}`}>
                  {order.performerType}
                </Badge>
                <Badge className={`text-xs font-medium border-0 ${GENDER_COLOR[order.gender]}`}>
                  {order.gender}
                </Badge>
              </div>
              <h3 className="font-semibold text-base leading-tight">{order.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={13} />
                  {order.date}, {order.startTime}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={13} />
                  {order.address.split(',')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={13} />
                  {order.duration}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-bold text-primary">{order.price.toLocaleString()} ₽</p>
              <Icon
                name={expanded ? 'ChevronUp' : 'ChevronDown'}
                size={18}
                className="text-muted-foreground mt-1 ml-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          <div className="h-px bg-border" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Адрес</p>
              <p className="font-medium">{order.address}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Быть на месте к</p>
              <p className="font-medium">{order.arriveTime}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Длительность</p>
              <p className="font-medium">{order.duration}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Нужен</p>
              <p className="font-medium">{order.performerType} · {order.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Описание</p>
            <p className="text-sm leading-relaxed text-foreground/80">{order.description}</p>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{order.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">{order.author.name}</p>
                <p className="text-xs text-muted-foreground">Заказчик</p>
              </div>
            </div>
            <Button
              className="gradient-purple text-white"
              onClick={(e) => { e.stopPropagation(); onOpenChat(order); }}
            >
              <Icon name="MessageCircle" size={15} className="mr-2" />
              Перейти в чат
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderChatModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'them', text: 'Здравствуйте! Интересует ваш заказ.' },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: 'me', text: message }]);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md flex flex-col" style={{ maxHeight: '85vh' }}>
        <div className="flex items-center gap-3 p-4 border-b">
          <Avatar className="w-9 h-9">
            <AvatarFallback>{order.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{order.author.name}</p>
            <p className="text-xs text-muted-foreground">Заказчик</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mx-3 mt-3 rounded-xl border bg-muted/40 overflow-hidden">
          {order.cover && (
            <img src={order.cover} alt={order.title} className="w-full h-24 object-cover" />
          )}
          <div className="p-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <Badge className={`text-xs border-0 mb-1 ${TYPE_COLOR[order.performerType] || ''}`}>
                  {order.performerType}
                </Badge>
                <p className="font-semibold text-sm">{order.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {order.date}, {order.startTime} · {order.address.split(',')[0]}
                </p>
              </div>
              <p className="font-bold text-primary shrink-0">{order.price.toLocaleString()} ₽</p>
            </div>
            {!accepted ? (
              <Button className="w-full gradient-purple text-white" onClick={() => setAccepted(true)}>
                <Icon name="CheckCircle" size={15} className="mr-2" />
                Принять заказ
              </Button>
            ) : (
              <div className="flex items-center gap-2 justify-center py-2">
                <Icon name="CheckCircle" size={16} className="text-green-500" />
                <span className="text-sm font-medium text-green-600">Заказ принят!</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  msg.from === 'me'
                    ? 'gradient-purple text-white rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none"
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-full flex items-center justify-center gradient-purple text-white shrink-0"
          >
            <Icon name="Send" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ──────────────── SearchRequestCard ──────────────── */
const SearchRequestCard = ({ req }: { req: SearchRequest }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`rounded-2xl border bg-card overflow-hidden transition-all duration-300 cursor-pointer group
        ${expanded ? 'shadow-lg ring-1 ring-orange-400/30' : 'hover:shadow-md hover:-translate-y-0.5'}`}
    >
      <div className={`p-4 ${expanded ? 'pb-2' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <Badge className={`text-xs font-medium border-0 ${CATEGORY_COLOR[req.category] || 'bg-muted text-muted-foreground'}`}>
                {req.category}
              </Badge>
              <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                <Icon name="Timer" size={11} />
                до {req.deadline}
              </span>
            </div>
            <h3 className="font-semibold text-base leading-tight">{req.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={13} />
                {req.date}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="MapPin" size={13} />
                {req.city}
              </span>
              {req.budget && (
                <span className="flex items-center gap-1">
                  <Icon name="Wallet" size={13} />
                  до {req.budget.toLocaleString()} ₽
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            {req.budget ? (
              <p className="text-xl font-bold text-orange-500">{req.budget.toLocaleString()} ₽</p>
            ) : (
              <p className="text-sm text-muted-foreground font-medium">Бюджет<br/>не указан</p>
            )}
            <Icon
              name={expanded ? 'ChevronUp' : 'ChevronDown'}
              size={18}
              className="text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in" onClick={e => e.stopPropagation()}>
          <div className="h-px bg-border" />

          {req.description && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Подробности</p>
              <p className="text-sm leading-relaxed text-foreground/80">{req.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Дата / период</p>
              <p className="font-medium">{req.date}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Актуально до</p>
              <p className="font-medium">{req.deadline}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{req.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">{req.author.name}</p>
                <p className="text-xs text-muted-foreground">Разместил заявку</p>
              </div>
            </div>
            <Button className="gradient-orange text-white border-0 hover:opacity-90">
              <Icon name="MessageCircle" size={15} className="mr-2" />
              Откликнуться
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ──────────────── Main Page ──────────────── */
const Orders = () => {
  const [tab, setTab] = useState<'orders' | 'search'>('orders');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [searchRequests, setSearchRequests] = useState<SearchRequest[]>(MOCK_SEARCH_REQUESTS);
  const [filterType, setFilterType] = useState('Все');
  const [filterGender, setFilterGender] = useState('Все');
  const [sortBy, setSortBy] = useState('date');
  const [searchCategory, setSearchCategory] = useState('Все');
  const [chatOrder, setChatOrder] = useState<Order | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateSearch, setShowCreateSearch] = useState(false);

  const filteredOrders = orders
    .filter((o) => filterType === 'Все' || o.performerType === filterType)
    .filter((o) => filterGender === 'Все' || o.gender === filterGender || (filterGender === 'Не важно' && o.gender === 'Не важно'))
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const filteredSearch = searchRequests
    .filter(r => searchCategory === 'Все' || r.category === searchCategory)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <DashboardLayout>
      <div className="max-w-2xl animate-fade-in space-y-6">

        {/* ── Заголовок + кнопка ── */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {tab === 'orders' ? 'Заказы' : 'Ищейка'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {tab === 'orders'
                ? 'Открытые заявки от организаторов мероприятий'
                : 'Заявки на поиск реквизита, костюмов и оборудования'}
            </p>
          </div>
          {tab === 'orders' ? (
            <Button className="gradient-purple text-white shrink-0" onClick={() => setShowCreate(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Создать заказ
            </Button>
          ) : (
            <Button
              className="gradient-orange text-white border-0 hover:opacity-90 shrink-0"
              onClick={() => setShowCreateSearch(true)}
            >
              <Icon name="Search" size={16} className="mr-2" />
              Ищу реквизит
            </Button>
          )}
        </div>

        {/* ── Таб-переключатель ── */}
        <div className="relative flex bg-muted rounded-2xl p-1 gap-1">
          {/* Скользящий индикатор */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-in-out shadow-sm
              ${tab === 'orders' ? 'left-1 gradient-purple' : 'left-[calc(50%+2px)] gradient-orange'}`}
          />
          <button
            onClick={() => setTab('orders')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors duration-200
              ${tab === 'orders' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <span>🎭</span>
            Заказы
            <Badge className={`text-[10px] px-1.5 h-4 border-0 ${tab === 'orders' ? 'bg-white/20 text-white' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
              {filteredOrders.length}
            </Badge>
          </button>
          <button
            onClick={() => setTab('search')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors duration-200
              ${tab === 'search' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <span>🎒</span>
            Ищейка
            <Badge className={`text-[10px] px-1.5 h-4 border-0 ${tab === 'search' ? 'bg-white/20 text-white' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
              {filteredSearch.length}
            </Badge>
          </button>
        </div>

        {/* ── Контент с fade-переходом ── */}
        <div className="relative">

          {/* ── Лента заказов ── */}
          <div className={`transition-all duration-300 ${tab === 'orders' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'}`}>
            <div className="space-y-4">
              {/* Фильтры */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {PERFORMER_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        filterType === t
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                    {GENDER_OPTIONS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilterGender(g)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          filterGender === g ? 'bg-white shadow text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 bg-muted rounded-full p-1 ml-auto">
                    {SORT_OPTIONS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSortBy(s.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          sortBy === s.id ? 'bg-white shadow text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    Нет заказов по выбранным фильтрам
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onOpenChat={setChatOrder} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Лента Ищейки ── */}
          <div className={`transition-all duration-300 ${tab === 'search' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'}`}>
            <div className="space-y-4">
              {/* Описание-баннер */}
              <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 p-4 flex items-start gap-3">
                <div className="text-2xl mt-0.5">🎒</div>
                <div>
                  <p className="font-semibold text-sm text-orange-800">Что такое Ищейка?</p>
                  <p className="text-xs text-orange-700/80 mt-0.5 leading-relaxed">
                    Здесь организаторы ищут реквизит, костюмы и оборудование в аренду.
                    Если у вас есть что предложить — откликайтесь на заявки!
                  </p>
                </div>
              </div>

              {/* Фильтр по категории */}
              <div className="flex items-center gap-2 flex-wrap">
                {SEARCH_CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setSearchCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      searchCategory === c
                        ? 'gradient-orange text-white border-transparent'
                        : 'bg-background text-muted-foreground border-border hover:border-orange-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredSearch.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <span className="text-3xl block mb-2">🔍</span>
                    Нет заявок по выбранной категории
                  </div>
                ) : (
                  filteredSearch.map(req => (
                    <SearchRequestCard key={req.id} req={req} />
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {chatOrder && (
        <OrderChatModal order={chatOrder} onClose={() => setChatOrder(null)} />
      )}

      {showCreate && (
        <CreateOrderModal
          onClose={() => setShowCreate(false)}
          onSubmit={(order) => {
            setOrders((prev) => [order, ...prev]);
            setShowCreate(false);
          }}
        />
      )}

      {showCreateSearch && (
        <CreateSearchModal
          onClose={() => setShowCreateSearch(false)}
          onSubmit={(req) => {
            setSearchRequests(prev => [req, ...prev]);
            setShowCreateSearch(false);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Orders;
