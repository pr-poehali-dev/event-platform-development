import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const BG_OPTIONS = [
  { id: 'orange', label: 'Оранжевый', style: 'linear-gradient(135deg, #f97316 0%, #fdba74 100%)' },
  { id: 'purple', label: 'Фиолетовый', style: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
  { id: 'blue', label: 'Синий', style: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
  { id: 'green', label: 'Зелёный', style: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' },
  { id: 'rose', label: 'Розовый', style: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' },
  { id: 'indigo', label: 'Тёмно-синий', style: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
];

const ROLES = ['Аниматор', 'Ведущий', 'Клоун', 'Фокусник', 'DJ', 'Фотограф', 'Певец', 'Актёр', 'Танцор', 'Иллюзионист'];

const MOCK_REVIEWS = [
  { id: 1, author: 'Елена К.', avatar: 'E', rating: 5, date: '12 апреля 2025', text: 'Анна — просто чудо! Дети были в восторге, праздник прошёл на ура. Очень рекомендую!' },
  { id: 2, author: 'Михаил П.', avatar: 'M', rating: 5, date: '3 марта 2025', text: 'Отличный аниматор, всё по программе, дети не скучали ни минуты.' },
  { id: 3, author: 'Светлана В.', avatar: 'С', rating: 4, date: '18 января 2025', text: 'Хорошая работа, все игры понравились. Чуть опоздала, но в целом всё отлично.' },
];

const MOCK_CHATS = [
  { id: 1, name: 'Елена Соколова', avatar: 'Е', lastMsg: 'Спасибо за праздник!', time: '14:20', unread: 0 },
  { id: 2, name: 'Агентство EventPro', avatar: 'A', lastMsg: 'Есть заказ на 25 апреля', time: 'Вчера', unread: 2 },
  { id: 3, name: 'Михаил Петров', avatar: 'М', lastMsg: 'Можете приехать в Подмосковье?', time: 'Пн', unread: 1 },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Icon
        key={s}
        name="Star"
        size={16}
        className={s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
);

const ArtistProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBg, setSelectedBg] = useState('orange');
  const [selectedRoles, setSelectedRoles] = useState(['Аниматор', 'Ведущий']);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const currentBg = BG_OPTIONS.find((b) => b.id === selectedBg)?.style || BG_OPTIONS[0].style;

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl animate-fade-in space-y-6">

        {/* Баннер-шапка */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: currentBg, minHeight: 200 }}
        >
          {/* Декоративные звёздочки */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {[
              { top: '18%', left: '38%' }, { top: '12%', left: '72%' },
              { top: '55%', left: '60%' }, { top: '35%', left: '85%' },
              { top: '70%', left: '48%' }, { top: '25%', left: '52%' },
            ].map((pos, i) => (
              <span
                key={i}
                className="absolute text-white/60 text-lg"
                style={{ top: pos.top, left: pos.left }}
              >✦</span>
            ))}
          </div>

          {/* Аватар + имя */}
          <div className="relative p-6 flex items-end gap-5" style={{ minHeight: 200 }}>
            <div className="relative mt-auto">
              <div className="w-24 h-24 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 overflow-hidden shadow-lg">
                <Avatar className="w-24 h-24 rounded-2xl">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" className="rounded-2xl" />
                  <AvatarFallback className="text-2xl font-bold text-white bg-transparent">А</AvatarFallback>
                </Avatar>
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
                  <Icon name="Camera" size={14} className="text-primary" />
                </button>
              )}
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white drop-shadow">Анна Петрова</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {selectedRoles.map((r) => (
                  <span key={r} className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-full">{r}</span>
                ))}
              </div>
            </div>
            {/* Кнопка редактирования */}
            <div className="ml-auto mb-2">
              <Button
                size="sm"
                variant={isEditing ? 'secondary' : 'outline'}
                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Icon name={isEditing ? 'X' : 'Edit'} size={15} className="mr-1.5" />
                {isEditing ? 'Отменить' : 'Редактировать'}
              </Button>
            </div>
          </div>

          {/* Выбор фона (только в режиме редактирования) */}
          {isEditing && (
            <div className="px-6 pb-4 flex items-center gap-2 flex-wrap">
              <span className="text-white/80 text-sm mr-1">Фон:</span>
              {BG_OPTIONS.map((bg) => (
                <button
                  key={bg.id}
                  title={bg.label}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selectedBg === bg.id ? 'border-white scale-110' : 'border-white/30'}`}
                  style={{ background: bg.style }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Рейтинг */}
        <div className="flex items-center gap-4 px-1">
          <StarRating rating={5} />
          <span className="font-semibold text-lg">4.9</span>
          <span className="text-muted-foreground text-sm">47 отзывов</span>
          <Badge variant="outline" className="ml-auto">5 лет опыта</Badge>
          <Badge variant="outline">Москва</Badge>
        </div>

        {/* Табы */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="about">О себе</TabsTrigger>
            <TabsTrigger value="roles">Роли</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="chats">Чаты</TabsTrigger>
          </TabsList>

          {/* О себе */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Имя и фамилия</Label>
                    <Input defaultValue="Анна Петрова" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Телефон</Label>
                    <Input type="tel" defaultValue="+7 (999) 123-45-67" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Город</Label>
                    <Input defaultValue="Москва" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="anna@example.com" disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>О себе</Label>
                  <Textarea
                    rows={4}
                    defaultValue="Профессиональный аниматор с опытом работы на детских праздниках. Работаю с детьми от 3 до 10 лет. Создаю яркие и незабываемые праздники!"
                    disabled={!isEditing}
                  />
                </div>
                {isEditing && (
                  <div className="flex gap-3 pt-2">
                    <Button className="gradient-purple text-white" onClick={() => setIsEditing(false)}>
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Отменить</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Роли */}
          <TabsContent value="roles">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Чем я занимаюсь</h3>
                  <p className="text-sm text-muted-foreground mb-4">Выберите роли, которые вам подходят</p>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((role) => {
                      const active = selectedRoles.includes(role);
                      return (
                        <button
                          key={role}
                          onClick={() => isEditing && toggleRole(role)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                            ${active
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-foreground border-border hover:border-primary/50'
                            }
                            ${!isEditing ? 'cursor-default' : 'cursor-pointer'}
                          `}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {!isEditing && (
                  <p className="text-xs text-muted-foreground">Нажмите «Редактировать» в шапке, чтобы изменить роли</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Отзывы */}
          <TabsContent value="reviews" className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl">
              <div className="text-center">
                <div className="text-4xl font-bold">4.9</div>
                <StarRating rating={5} />
                <div className="text-xs text-muted-foreground mt-1">47 отзывов</div>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <span className="w-2">{s}</span>
                    <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: s === 5 ? '85%' : s === 4 ? '10%' : '5%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {MOCK_REVIEWS.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{r.author}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <StarRating rating={r.rating} />
                      <p className="text-sm text-muted-foreground mt-1.5">{r.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Чаты */}
          <TabsContent value="chats">
            <Card className="overflow-hidden">
              <div className="flex h-[480px]">
                {/* Список чатов */}
                <div className="w-64 border-r shrink-0 flex flex-col">
                  <div className="p-3 border-b">
                    <Button size="sm" className="w-full gradient-purple text-white">
                      <Icon name="Plus" size={15} className="mr-1.5" />
                      Новый чат
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/40 ${activeChat === chat.id ? 'bg-muted' : ''}`}
                      >
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {chat.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">{chat.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0 ml-1">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                        </div>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">
                            {chat.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Область чата */}
                <div className="flex-1 flex flex-col">
                  {activeChat ? (
                    <>
                      <div className="p-3 border-b flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {MOCK_CHATS.find(c => c.id === activeChat)?.avatar}
                        </div>
                        <span className="font-medium text-sm">{MOCK_CHATS.find(c => c.id === activeChat)?.name}</span>
                      </div>
                      <div className="flex-1 p-4 text-center text-muted-foreground text-sm flex items-center justify-center">
                        Начните переписку
                      </div>
                      <div className="p-3 border-t flex gap-2">
                        <Input placeholder="Напишите сообщение..." className="flex-1" />
                        <Button size="icon" className="gradient-purple text-white shrink-0">
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                      Выберите чат или начните новый
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ArtistProfile;
