import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { StatusIndicator, StatusCard, StatusBadge } from '@/components/StatusIndicator';
import type { UserStatus } from '@/components/StatusIndicator';
import Header from '@/components/Header';

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    city: 'all',
    specialization: 'all',
    minRating: 0,
    experience: 'all'
  });

  const animators = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      rating: 4.9,
      reviews: 47,
      clientReviews: 38,
      agencyReviews: 9,
      specialization: 'Аниматор-клоун',
      experience: '5 лет',
      ageGroup: '3-10 лет',
      price: '3000₽/час',
      city: 'Москва',
      verified: true,
      status: 'available' as const,
      responseTime: 'Отвечает в течение 10 минут',
      about: 'Профессиональный аниматор с опытом работы на детских праздниках. Работаю с детьми от 3 до 10 лет. Создаю яркие незабываемые моменты для каждого ребёнка.',
      portfolio: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400'
      ],
      achievements: ['Топ-10 аниматоров', '50+ праздников', 'Проверенный профиль']
    },
    {
      id: 2,
      name: 'Дмитрий Иванов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      rating: 4.8,
      reviews: 32,
      clientReviews: 25,
      agencyReviews: 7,
      specialization: 'Фокусник',
      experience: '7 лет',
      ageGroup: '5-12 лет',
      price: '4000₽/час',
      city: 'Санкт-Петербург',
      verified: true,
      status: 'busy' as const,
      responseTime: 'На выступлении до 20:00',
      about: 'Профессиональный фокусник и иллюзионист. Создаю незабываемые шоу для детей и взрослых.',
      portfolio: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400'
      ],
      achievements: ['Мастер иллюзий', '100+ выступлений']
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      rating: 5.0,
      reviews: 68,
      clientReviews: 60,
      agencyReviews: 8,
      specialization: 'Аква-грим',
      experience: '4 года',
      ageGroup: '2-8 лет',
      price: '2500₽/час',
      city: 'Москва',
      verified: true,
      status: 'available' as const,
      responseTime: 'Отвечает в течение 5 минут',
      about: 'Художник аква-грима. Использую только профессиональные и безопасные материалы.',
      portfolio: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400'
      ],
      achievements: ['Лучший художник 2024', 'Работа с эко-красками']
    },
    {
      id: 4,
      name: 'Михаил Козлов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
      rating: 4.7,
      reviews: 29,
      clientReviews: 22,
      agencyReviews: 7,
      specialization: 'Ведущий праздников',
      experience: '6 лет',
      ageGroup: '4-14 лет',
      price: '5000₽/час',
      city: 'Москва',
      verified: false,
      status: 'later' as const,
      responseTime: 'Обычно отвечает в течение 2 часов',
      about: 'Веду детские и семейные праздники. Интерактивные программы и весёлые конкурсы.',
      portfolio: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400'
      ],
      achievements: ['Энергичный ведущий']
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Мария К.',
      rating: 5,
      text: 'Анна превзошла все ожидания! Дети были в восторге, праздник удался на славу! Подход к каждому ребёнку индивидуальный.',
      date: '2 дня назад',
      type: 'client',
      images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200']
    },
    {
      id: 2,
      author: 'Агентство "Праздник+"',
      rating: 5,
      text: 'Отличный специалист, всегда вовремя, профессиональный подход. Работаем уже 2 года.',
      date: '1 неделю назад',
      type: 'agency',
      images: []
    },
    {
      id: 3,
      author: 'Ольга С.',
      rating: 5,
      text: 'Рекомендую! Аниматор нашёл подход к каждому ребёнку. Праздник прошёл идеально!',
      date: '2 недели назад',
      type: 'client',
      images: []
    },
    {
      id: 4,
      author: 'Александр П.',
      rating: 4,
      text: 'Очень хорошо! Единственное — хотелось бы больше интерактива.',
      date: '3 недели назад',
      type: 'client',
      images: []
    }
  ];

  const selectedAnimator = selectedProfile ? animators.find(a => a.id === selectedProfile) : null;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold mb-3 block">Город</Label>
        <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Все города" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все города</SelectItem>
            <SelectItem value="moscow">Москва</SelectItem>
            <SelectItem value="spb">Санкт-Петербург</SelectItem>
            <SelectItem value="kazan">Казань</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">Специализация</Label>
        <Select value={filters.specialization} onValueChange={(value) => setFilters({ ...filters, specialization: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Все направления" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все направления</SelectItem>
            <SelectItem value="animator">Аниматор</SelectItem>
            <SelectItem value="magician">Фокусник</SelectItem>
            <SelectItem value="facepaint">Аква-грим</SelectItem>
            <SelectItem value="host">Ведущий</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Минимальный рейтинг: {filters.minRating.toFixed(1)}
        </Label>
        <Slider
          value={[filters.minRating]}
          onValueChange={(value) => setFilters({ ...filters, minRating: value[0] })}
          max={5}
          step={0.1}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">Опыт работы</Label>
        <Select value={filters.experience} onValueChange={(value) => setFilters({ ...filters, experience: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Любой опыт" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Любой опыт</SelectItem>
            <SelectItem value="1-3">1-3 года</SelectItem>
            <SelectItem value="3-5">3-5 лет</SelectItem>
            <SelectItem value="5+">5+ лет</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={() => setFilters({ city: 'all', specialization: 'all', minRating: 0, experience: 'all' })}>
        <Icon name="X" size={16} className="mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );

  const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <label className={className}>{children}</label>
  );

  if (selectedProfile && selectedAnimator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-white/50"
            onClick={() => setSelectedProfile(null)}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 overflow-hidden animate-fade-in">
                <div className="h-48 gradient-purple relative">
                  {selectedAnimator.verified && (
                    <Badge className="absolute top-4 right-4 bg-white/90 text-foreground border-0">
                      <Icon name="BadgeCheck" size={16} className="mr-1 text-blue-500" />
                      Проверен
                    </Badge>
                  )}
                  <div className="absolute -bottom-16 left-8">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarImage src={selectedAnimator.avatar} />
                      <AvatarFallback>{selectedAnimator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <CardContent className="pt-20 pb-6">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{selectedAnimator.name}</h1>
                      <p className="text-xl text-muted-foreground mb-3">{selectedAnimator.specialization}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{selectedAnimator.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{selectedAnimator.reviews} отзывов</span>
                        <span className="text-muted-foreground">•</span>
                        <Badge variant="secondary">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {selectedAnimator.city}
                        </Badge>
                      </div>
                    </div>
                    <Badge className="gradient-orange text-white text-lg px-4 py-2 whitespace-nowrap">
                      {selectedAnimator.price}
                    </Badge>
                  </div>

                  <div className="flex gap-3 mb-6 flex-wrap">
                    <Badge variant="secondary">
                      <Icon name="Briefcase" size={16} className="mr-2" />
                      {selectedAnimator.experience}
                    </Badge>
                    <Badge variant="secondary">
                      <Icon name="Users" size={16} className="mr-2" />
                      {selectedAnimator.ageGroup}
                    </Badge>
                  </div>

                  {selectedAnimator.achievements.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold mb-2 text-muted-foreground">Достижения</p>
                      <div className="flex gap-2 flex-wrap">
                        {selectedAnimator.achievements.map((achievement, idx) => (
                          <Badge key={idx} className="gradient-blue text-white">
                            <Icon name="Award" size={14} className="mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">О себе</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedAnimator.about}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button className="gradient-purple text-white">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline">
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline">
                      <Icon name="Share2" size={18} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="portfolio" className="animate-fade-in">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="portfolio">
                    <Icon name="Image" size={16} className="mr-2" />
                    Портфолио ({selectedAnimator.portfolio.length})
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Отзывы ({selectedAnimator.reviews})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedAnimator.portfolio.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow">
                        <img
                          src={img}
                          alt={`Portfolio ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="mb-6 flex gap-4 flex-wrap">
                    <Card className="flex-1 min-w-[200px]">
                      <CardContent className="pt-6 text-center">
                        <Icon name="Users" size={24} className="mx-auto mb-2 text-purple-500" />
                        <p className="text-2xl font-bold">{selectedAnimator.clientReviews}</p>
                        <p className="text-sm text-muted-foreground">От клиентов</p>
                      </CardContent>
                    </Card>
                    <Card className="flex-1 min-w-[200px]">
                      <CardContent className="pt-6 text-center">
                        <Icon name="Building2" size={24} className="mx-auto mb-2 text-orange-500" />
                        <p className="text-2xl font-bold">{selectedAnimator.agencyReviews}</p>
                        <p className="text-sm text-muted-foreground">От агентств</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold">{review.author}</span>
                                {review.type === 'agency' && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Icon name="Building2" size={12} className="mr-1" />
                                    Агентство
                                  </Badge>
                                )}
                                {review.type === 'client' && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Icon name="User" size={12} className="mr-1" />
                                    Клиент
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Icon key={i} name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">{review.text}</p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2">
                              {review.images.map((img, idx) => (
                                <img key={idx} src={img} alt="Review" className="w-20 h-20 rounded-lg object-cover" />
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="border-2 sticky top-24 animate-fade-in">
                <CardContent className="pt-6 space-y-4">
                  <StatusCard 
                    status={selectedAnimator.status as UserStatus}
                    responseTime={selectedAnimator.responseTime}
                  />
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full gradient-purple text-white"
                      disabled={selectedAnimator.status === 'offline'}
                    >
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      {selectedAnimator.status === 'available' ? 'Написать сейчас' : 
                       selectedAnimator.status === 'busy' ? 'Написать (отвечу позже)' :
                       selectedAnimator.status === 'later' ? 'Оставить сообщение' : 'Написать'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Позвонить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 sticky top-[420px] animate-fade-in">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-center">QR-код для отзывов</h3>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl mb-4">
                    <div className="bg-white p-4 rounded-xl">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eventa.dev/review/${selectedProfile}`}
                        alt="QR Code"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Покажите этот QR-код клиентам после мероприятия — они смогут оставить отзыв за 30 секунд
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать QR
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Отправить ссылку
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-purple-50 to-pink-50 animate-fade-in">
                <CardContent className="pt-6">
                  <Icon name="Sparkles" size={32} className="mx-auto mb-3 text-purple-500" />
                  <h4 className="font-bold text-center mb-2">Хотите такой же профиль?</h4>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Создайте свою страницу за 2 минуты
                  </p>
                  <Button className="w-full gradient-purple text-white">
                    Создать профиль
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">Каталог профессионалов</h1>
          <p className="text-muted-foreground text-lg">
            Найдите идеального аниматора или артиста для вашего праздника
          </p>
        </div>

        <div className="flex gap-4 mb-8 animate-fade-in">
          <div className="relative flex-1">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск по имени, специализации, городу..."
              className="pl-12 h-14 text-base border-2 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="h-14 px-6 border-2">
                <Icon name="SlidersHorizontal" size={20} className="mr-2" />
                Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Фильтры</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <Card className="border-2 sticky top-24">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-6">Фильтры</h3>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {animators.map((animator) => (
                <Card
                  key={animator.id}
                  className="group cursor-pointer border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                  onClick={() => setSelectedProfile(animator.id)}
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage src={animator.avatar} className="object-cover" />
                      <AvatarFallback>{animator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute top-3 left-3">
                      <StatusBadge status={animator.status as UserStatus} compact />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {animator.verified && (
                        <Badge className="bg-white/90 text-foreground border-0 backdrop-blur-sm">
                          <Icon name="BadgeCheck" size={14} className="mr-1 text-blue-500" />
                        </Badge>
                      )}
                      <Badge className="bg-white/90 text-foreground border-0 backdrop-blur-sm">
                        <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                        {animator.rating}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{animator.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{animator.specialization}</p>
                      </div>
                    </div>
                    <StatusIndicator 
                      status={animator.status as UserStatus} 
                      size="sm" 
                      className="mb-3"
                    />
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        {animator.city}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Briefcase" size={12} className="mr-1" />
                        {animator.experience}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-sm text-muted-foreground">
                        <Icon name="MessageSquare" size={14} className="inline mr-1" />
                        {animator.reviews}
                      </span>
                      <span className="font-bold text-primary">{animator.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;