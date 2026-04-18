export interface SearchRequest {
  id: number;
  title: string;
  description: string;
  date: string;
  city: string;
  budget?: number;
  category: string;
  deadline: string;
  author: { name: string; avatar: string };
  createdAt: string;
}

export const CATEGORY_COLOR: Record<string, string> = {
  'Реквизит': 'bg-violet-100 text-violet-700',
  'Костюм': 'bg-pink-100 text-pink-700',
  'Оборудование': 'bg-blue-100 text-blue-700',
  'Декор': 'bg-emerald-100 text-emerald-700',
  'Свет/Звук': 'bg-amber-100 text-amber-700',
  'Другое': 'bg-muted text-muted-foreground',
};

export const MOCK_SEARCH_REQUESTS: SearchRequest[] = [
  {
    id: 1,
    title: 'Нужна активная колонка JBL',
    description: 'Ищу колонку мощностью 100+ Вт для уличного мероприятия. Нужен Bluetooth + AUX. Самовывоз или доставка по договорённости.',
    date: '28–30 апреля',
    city: 'Москва',
    budget: 1500,
    category: 'Оборудование',
    deadline: '26 апреля',
    author: { name: 'Сергей Миронов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mironov' },
    createdAt: '2025-04-16',
  },
  {
    id: 2,
    title: 'Костюм Санта-Клауса (взрослый)',
    description: 'Нужен качественный костюм Деда Мороза или Санты для аниматора. Размер L–XL. Можно аренду на 1 день.',
    date: '1 мая',
    city: 'Санкт-Петербург',
    budget: 800,
    category: 'Костюм',
    deadline: '28 апреля',
    author: { name: 'Event Studio', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Studio' },
    createdAt: '2025-04-15',
  },
  {
    id: 3,
    title: 'Мыльные пузыри — установка',
    description: 'Нужна машинка для гигантских мыльных пузырей на детский праздник. Аренда на 2 часа.',
    date: '5 мая',
    city: 'Казань',
    category: 'Реквизит',
    deadline: '2 мая',
    author: { name: 'Алина Фокс', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fox' },
    createdAt: '2025-04-14',
  },
  {
    id: 4,
    title: 'Световые стойки + прожекторы',
    description: 'Для свадьбы на 80 гостей. Нужно 2–4 световые стойки + заливной свет. Монтаж вечером 9 мая.',
    date: '9–10 мая',
    city: 'Екатеринбург',
    budget: 5000,
    category: 'Свет/Звук',
    deadline: '6 мая',
    author: { name: 'Михаил П.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petrov2' },
    createdAt: '2025-04-13',
  },
  {
    id: 5,
    title: 'Арка из шаров — аренда',
    description: 'Ищу готовую арку из воздушных шаров (2+ метра) для фотозоны. Тематика — пастель/нюд.',
    date: '12 мая',
    city: 'Москва',
    budget: 2000,
    category: 'Декор',
    deadline: '9 мая',
    author: { name: 'Юлия Котова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kotova' },
    createdAt: '2025-04-12',
  },
];
