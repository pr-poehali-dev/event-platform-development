import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import OnboardingFlow from '@/components/OnboardingFlow';
import AuthModal from '@/components/AuthModal';
import FAQ from '@/components/FAQ';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');

  const animators = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      rating: 4.9,
      reviews: 47,
      specialization: 'Аниматор-клоун',
      experience: '5 лет',
      ageGroup: '3-10 лет',
      price: '3000₽/час',
      about: 'Профессиональный аниматор с опытом работы на детских праздниках. Работаю с детьми от 3 до 10 лет.',
      portfolio: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400'
      ]
    },
    {
      id: 2,
      name: 'Дмитрий Иванов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      rating: 4.8,
      reviews: 32,
      specialization: 'Фокусник',
      experience: '7 лет',
      ageGroup: '5-12 лет',
      price: '4000₽/час',
      about: 'Профессиональный фокусник и иллюзионист. Создаю незабываемые шоу для детей и взрослых.',
      portfolio: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400'
      ]
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      rating: 5.0,
      reviews: 68,
      specialization: 'Аква-грим',
      experience: '4 года',
      ageGroup: '2-8 лет',
      price: '2500₽/час',
      about: 'Художник аква-грима. Использую только профессиональные и безопасные материалы.',
      portfolio: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400'
      ]
    },
    {
      id: 4,
      name: 'Михаил Козлов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
      rating: 4.7,
      reviews: 29,
      specialization: 'Ведущий праздников',
      experience: '6 лет',
      ageGroup: '4-14 лет',
      price: '5000₽/час',
      about: 'Веду детские и семейные праздники. Интерактивные программы и весёлые конкурсы.',
      portfolio: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
        'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400'
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Мария К.',
      rating: 5,
      text: 'Анна превзошла все ожидания! Дети были в восторге, праздник удался на славу!',
      date: '2 дня назад',
      type: 'client'
    },
    {
      id: 2,
      author: 'Агентство "Праздник+"',
      rating: 5,
      text: 'Отличный специалист, всегда вовремя, профессиональный подход.',
      date: '1 неделю назад',
      type: 'agency'
    },
    {
      id: 3,
      author: 'Ольга С.',
      rating: 5,
      text: 'Рекомендую! Аниматор нашёл подход к каждому ребёнку.',
      date: '2 недели назад',
      type: 'client'
    }
  ];

  const selectedAnimator = selectedProfile ? animators.find(a => a.id === selectedProfile) : null;

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {!selectedProfile ? (
        <>
          <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
                    <Icon name="Sparkles" className="text-white" size={24} />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Эвента
                  </h1>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                  <button onClick={() => navigate('/profiles')} className="text-sm font-medium hover:text-primary transition-colors">Профили</button>
                  <button onClick={() => navigate('/agencies')} className="text-sm font-medium hover:text-primary transition-colors">Для агентств</button>
                  <button onClick={() => navigate('/about')} className="text-sm font-medium hover:text-primary transition-colors">О платформе</button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setAuthDefaultTab('login');
                      setShowAuthModal(true);
                    }}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                  <Button 
                    className="gradient-purple text-white border-0" 
                    onClick={() => {
                      setAuthDefaultTab('register');
                      setShowAuthModal(true);
                    }}
                  >
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    Создать профиль
                  </Button>
                </nav>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </div>
            </div>
          </header>

          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Найдите идеального
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                    аниматора для праздника
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Профессиональная платформа для event-индустрии с проверенными отзывами и прозрачными рейтингами
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                  <div className="relative flex-1 w-full">
                    <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                      placeholder="Найти аниматора, артиста, агентство..."
                      className="pl-12 h-14 text-lg rounded-full border-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button size="lg" className="gradient-purple text-white h-14 px-8 rounded-full">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                  { icon: 'Star', title: 'Проверенные отзывы', desc: 'Только реальные отзывы через QR-коды' },
                  { icon: 'Shield', title: 'Прозрачность', desc: 'Открытые профили с портфолио и рейтингами' },
                  { icon: 'Zap', title: 'Без хаоса', desc: 'Забудьте про бесконечные Telegram-чаты' }
                ].map((feature, idx) => (
                  <Card key={idx} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center mb-4">
                        <Icon name={feature.icon as any} className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-3xl font-bold">Топ аниматоров</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {animators.map((animator) => (
                  <Card
                    key={animator.id}
                    className="group cursor-pointer border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    onClick={() => setSelectedProfile(animator.id)}
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src={animator.avatar} className="object-cover" />
                        <AvatarFallback>{animator.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-foreground border-0 backdrop-blur-sm">
                          <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                          {animator.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h4 className="font-bold text-lg mb-1">{animator.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{animator.specialization}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="Briefcase" size={12} className="mr-1" />
                          {animator.experience}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="Users" size={12} className="mr-1" />
                          {animator.ageGroup}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-muted-foreground">
                          <Icon name="MessageSquare" size={14} className="inline mr-1" />
                          {animator.reviews} отзывов
                        </span>
                        <span className="font-bold text-primary">{animator.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <FAQ />

          <section className="py-16 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
            <div className="container mx-auto max-w-4xl text-center text-white">
              <h3 className="text-4xl font-bold mb-6">Присоединяйтесь к Эвенте</h3>
              <p className="text-xl mb-8 opacity-90">
                Станьте частью профессионального сообщества event-индустрии
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg h-14 px-8 rounded-full" onClick={() => setShowOnboarding(true)}>
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Я аниматор
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => setShowOnboarding(true)}>
                  <Icon name="Building2" size={20} className="mr-2" />
                  Я агентство
                </Button>
              </div>
            </div>
          </section>

          <footer className="bg-white border-t py-8 px-4">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>© 2024 Эвента. Платформа для event-индустрии</p>
            </div>
          </footer>
        </>
      ) : (
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setSelectedProfile(null)}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к профилям
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6 overflow-hidden border-2">
                <div className="h-48 gradient-purple relative">
                  <div className="absolute -bottom-16 left-8">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarImage src={selectedAnimator?.avatar} />
                      <AvatarFallback>{selectedAnimator?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <CardContent className="pt-20 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedAnimator?.name}</h2>
                      <p className="text-xl text-muted-foreground mb-3">{selectedAnimator?.specialization}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{selectedAnimator?.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{selectedAnimator?.reviews} отзывов</span>
                      </div>
                    </div>
                    <Badge className="gradient-orange text-white text-lg px-4 py-2">
                      {selectedAnimator?.price}
                    </Badge>
                  </div>

                  <div className="flex gap-3 mb-6">
                    <Badge variant="secondary">
                      <Icon name="Briefcase" size={16} className="mr-2" />
                      Опыт: {selectedAnimator?.experience}
                    </Badge>
                    <Badge variant="secondary">
                      <Icon name="Users" size={16} className="mr-2" />
                      Возраст: {selectedAnimator?.ageGroup}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">О себе</h3>
                    <p className="text-muted-foreground">{selectedAnimator?.about}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button className="gradient-purple text-white">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline">
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="portfolio" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="portfolio">
                    <Icon name="Image" size={16} className="mr-2" />
                    Портфолио
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Отзывы
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio" className="mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {selectedAnimator?.portfolio.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                          src={img}
                          alt={`Portfolio ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{review.author}</span>
                              {review.type === 'agency' && (
                                <Badge variant="secondary" className="text-xs">
                                  <Icon name="Building2" size={12} className="mr-1" />
                                  Агентство
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Icon key={i} name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="border-2 sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-center">QR-код для отзывов</h3>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl mb-4">
                    <div className="bg-white p-4 rounded-xl">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eventa.dev/review/1"
                        alt="QR Code"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Клиенты могут отсканировать этот QR-код и оставить отзыв без регистрации
                  </p>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать QR-код
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab={authDefaultTab}
      />
    </div>
  );
};

export default Index;