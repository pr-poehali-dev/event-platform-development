import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const CITIES = ['Все города', 'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'];

const USERS_POINTS = [
  { id: 1, name: 'Анна Петрова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', role: 'Аниматор-клоун', city: 'Москва', points: 4820, pointsMonth: 980, reviews: 47, stars: 4.9, events: 134 },
  { id: 2, name: 'Дмитрий Иванов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', role: 'Фокусник', city: 'Санкт-Петербург', points: 4310, pointsMonth: 740, reviews: 32, stars: 4.8, events: 98 },
  { id: 3, name: 'Елена Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', role: 'Аква-грим', city: 'Москва', points: 3990, pointsMonth: 820, reviews: 68, stars: 5.0, events: 112 },
  { id: 4, name: 'Михаил Козлов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail', role: 'Ведущий', city: 'Казань', points: 3450, pointsMonth: 610, reviews: 29, stars: 4.7, events: 87 },
  { id: 5, name: 'Ольга Белова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', role: 'Танцор', city: 'Екатеринбург', points: 3120, pointsMonth: 590, reviews: 41, stars: 4.8, events: 76 },
  { id: 6, name: 'Сергей Новиков', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey', role: 'DJ', city: 'Москва', points: 2870, pointsMonth: 430, reviews: 24, stars: 4.6, events: 65 },
  { id: 7, name: 'Татьяна Лисова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tatiana', role: 'Певица', city: 'Санкт-Петербург', points: 2540, pointsMonth: 380, reviews: 19, stars: 4.7, events: 52 },
  { id: 8, name: 'Андрей Морозов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrey', role: 'Иллюзионист', city: 'Новосибирск', points: 2210, pointsMonth: 310, reviews: 17, stars: 4.5, events: 44 },
  { id: 9, name: 'Ирина Волкова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Irina', role: 'Фотограф', city: 'Казань', points: 1980, pointsMonth: 270, reviews: 22, stars: 4.9, events: 38 },
  { id: 10, name: 'Павел Крылов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pavel', role: 'Актёр', city: 'Москва', points: 1750, pointsMonth: 230, reviews: 14, stars: 4.6, events: 31 },
];

const USERS_STARS = [...USERS_POINTS].sort((a, b) => b.stars - a.stars || b.reviews - a.reviews);

const PERIOD_OPTIONS = [
  { id: 'all', label: 'За всё время' },
  { id: 'month', label: 'За месяц' },
];

const MEDAL_COLORS = [
  { ring: 'ring-yellow-400', bg: 'from-yellow-400/20 to-yellow-100/40', crown: 'text-yellow-400', label: '1 место', size: 'w-24 h-24', order: 'order-2 -mb-0' },
  { ring: 'ring-gray-400', bg: 'from-gray-300/20 to-gray-100/40', crown: 'text-gray-400', label: '2 место', size: 'w-20 h-20', order: 'order-1' },
  { ring: 'ring-amber-600', bg: 'from-amber-700/20 to-amber-100/40', crown: 'text-amber-600', label: '3 место', size: 'w-20 h-20', order: 'order-3' },
];

const PODIUM_HEIGHTS = ['h-28', 'h-16', 'h-10'];
const PODIUM_LABELS = ['🥇', '🥈', '🥉'];

const StarRow = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Icon
        key={s}
        name="Star"
        size={12}
        className={s <= Math.round(value) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
);

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  city: string;
  points: number;
  pointsMonth: number;
  reviews: number;
  stars: number;
  events: number;
}

const Podium = ({ top3, period, type }: { top3: User[]; period: string; type: 'points' | 'stars' }) => {
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <div className="flex items-end justify-center gap-4 pt-6 pb-2">
      {podiumOrder.map((user, idx) => {
        const realIdx = idx === 0 ? 1 : idx === 1 ? 0 : 2;
        const medal = MEDAL_COLORS[realIdx];
        const value = type === 'points'
          ? (period === 'month' ? user.pointsMonth : user.points)
          : user.stars;

        return (
          <div key={user.id} className={`flex flex-col items-center ${medal.order}`}>
            <div className="text-2xl mb-1">{PODIUM_LABELS[realIdx]}</div>
            <div className={`relative rounded-full ring-4 ${medal.ring} shadow-lg ${medal.size}`}>
              <Avatar className={`${medal.size} rounded-full`}>
                <AvatarImage src={user.avatar} className="rounded-full" />
                <AvatarFallback className="text-lg font-bold">{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-2 text-center max-w-[90px]">
              <p className="text-sm font-semibold leading-tight">{user.name.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
              <p className="text-sm font-bold mt-1 text-primary">
                {type === 'points'
                  ? `${value.toLocaleString()} б.`
                  : `★ ${value}`}
              </p>
            </div>
            <div className={`mt-3 w-20 ${PODIUM_HEIGHTS[realIdx]} rounded-t-xl bg-gradient-to-t ${medal.bg} border border-white/60 flex items-start justify-center pt-2`}>
              <span className="text-xs font-bold text-muted-foreground">{medal.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RankRow = ({ user, rank, period, type }: { user: User; rank: number; period: string; type: 'points' | 'stars' }) => {
  const value = type === 'points'
    ? (period === 'month' ? user.pointsMonth : user.points)
    : user.stars;
  const isMe = user.id === 1;

  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${isMe ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'}`}>
      <span className="w-6 text-center font-bold text-muted-foreground text-sm">{rank}</span>
      <Avatar className="w-10 h-10">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm truncate">{user.name}</p>
          {isMe && <Badge className="text-xs px-1.5 py-0 gradient-purple text-white border-0">Вы</Badge>}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{user.role}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{user.city}</span>
        </div>
      </div>
      <div className="text-right shrink-0">
        {type === 'points' ? (
          <p className="font-bold text-sm text-primary">{value.toLocaleString()} б.</p>
        ) : (
          <div className="flex flex-col items-end gap-0.5">
            <StarRow value={user.stars} />
            <p className="text-xs text-muted-foreground">{user.reviews} отзывов</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">{user.events} мероприятий</p>
      </div>
    </div>
  );
};

const RatingTab = ({ data, period, type }: { data: User[]; period: string; type: 'points' | 'stars' }) => {
  const top3 = data.slice(0, 3);
  const rest = data.slice(3, 10);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-muted/40 to-transparent rounded-2xl pb-2">
        <Podium top3={top3} period={period} type={type} />
      </div>
      <div className="space-y-1.5">
        {rest.map((user, i) => (
          <RankRow key={user.id} user={user} rank={i + 4} period={period} type={type} />
        ))}
      </div>
    </div>
  );
};

const Rating = () => {
  const [period, setPeriod] = useState('all');
  const [city, setCity] = useState('Все города');

  const filterByCity = (list: User[]) =>
    city === 'Все города' ? list : list.filter((u) => u.city === city);

  const pointsData = filterByCity([...USERS_POINTS].sort((a, b) =>
    (period === 'month' ? b.pointsMonth - a.pointsMonth : b.points - a.points)
  ));

  const starsData = filterByCity([...USERS_STARS]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl animate-fade-in space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Рейтинг</h2>
          <p className="text-muted-foreground">Лучшие специалисты платформы Эвента</p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Период */}
          <div className="flex items-center gap-1 bg-muted rounded-full p-1">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPeriod(opt.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  period === opt.id
                    ? 'bg-white shadow text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Город */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  city === c
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Табы */}
        <Tabs defaultValue="points" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="points" className="gap-2">
              <Icon name="Zap" size={15} />
              Топ по баллам
            </TabsTrigger>
            <TabsTrigger value="stars" className="gap-2">
              <Icon name="Star" size={15} />
              Топ по рейтингу
            </TabsTrigger>
          </TabsList>

          <TabsContent value="points">
            {pointsData.length >= 3 ? (
              <RatingTab data={pointsData} period={period} type="points" />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                Недостаточно участников в этом городе
              </div>
            )}
          </TabsContent>

          <TabsContent value="stars">
            {starsData.length >= 3 ? (
              <RatingTab data={starsData} period={period} type="stars" />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                Недостаточно участников в этом городе
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Пояснение баллов */}
        <div className="rounded-xl bg-muted/50 p-4 space-y-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Icon name="Info" size={15} className="text-primary" />
            Как начисляются баллы?
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span>✦ Завершённое мероприятие — +30 б.</span>
            <span>✦ Отзыв от клиента — +20 б.</span>
            <span>✦ Оценка 5 звёзд — +10 б.</span>
            <span>✦ Заполненный профиль — +50 б.</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Rating;
