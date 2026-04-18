/* ─── Типы ─── */
export interface Reaction { emoji: string; from: 'me' | 'them' }
export interface MsgVersion { text: string; at: string }
export interface Message {
  id: number;
  from: 'me' | 'them';
  text: string;
  time: string;
  read: boolean;
  reactions: Reaction[];
  versions: MsgVersion[];
  editCount: number;
  replyTo?: number;
  forwarded?: boolean;
}
export interface Chat {
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
export const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
export const ME_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna';

/* ─── Вспомогательные ─── */
export const timeNow = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
export const lastMsg = (c: Chat) => {
  const m = c.messages[c.messages.length - 1];
  if (!m) return '';
  return (m.from === 'me' ? 'Вы: ' : '') + m.text;
};

/* ─── Данные ─── */
export const INIT_CHATS: Chat[] = [
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
