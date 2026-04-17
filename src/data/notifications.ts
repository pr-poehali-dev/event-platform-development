export type NotificationType = 'news' | 'review' | 'support' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  text: string;
  time: string;
  read: boolean;
  link?: string;
}

export const NOTIFICATION_META: Record<NotificationType, { icon: string; color: string; label: string }> = {
  news: {
    icon: 'Newspaper',
    color: 'text-blue-500 bg-blue-500/10',
    label: 'Новости',
  },
  review: {
    icon: 'Star',
    color: 'text-amber-500 bg-amber-500/10',
    label: 'Отзывы',
  },
  support: {
    icon: 'Headphones',
    color: 'text-emerald-500 bg-emerald-500/10',
    label: 'Поддержка',
  },
  system: {
    icon: 'ShieldAlert',
    color: 'text-rose-500 bg-rose-500/10',
    label: 'Система',
  },
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'review',
    title: 'Новый отзыв',
    text: 'Клиент Мария оставила вам отзыв со звёздами ★★★★★.',
    time: '5 минут назад',
    read: false,
    link: '/dashboard/reviews',
  },
  {
    id: '2',
    type: 'support',
    title: 'Ответ от поддержки',
    text: 'Наша команда ответила на ваш запрос #1042.',
    time: '1 час назад',
    read: false,
    link: '/dashboard/support',
  },
  {
    id: '3',
    type: 'news',
    title: 'Обновление платформы',
    text: 'Добавлена страница документов и публичная оферта.',
    time: '2 часа назад',
    read: true,
    link: '/dashboard/news',
  },
  {
    id: '4',
    type: 'review',
    title: 'Новый отзыв',
    text: 'Пользователь Алексей оставил отзыв о вашем профиле.',
    time: 'Вчера, 18:30',
    read: true,
    link: '/dashboard/reviews',
  },
  {
    id: '5',
    type: 'system',
    title: 'Технические работы',
    text: 'Плановые работы 20 апреля с 03:00 до 05:00 МСК. Сервис может быть недоступен.',
    time: 'Вчера, 12:00',
    read: true,
  },
  {
    id: '6',
    type: 'news',
    title: 'Новая статья в блоге',
    text: 'Как увеличить число заявок через профиль — 5 советов от команды Эвента.',
    time: '3 дня назад',
    read: true,
    link: '/dashboard/news',
  },
];
