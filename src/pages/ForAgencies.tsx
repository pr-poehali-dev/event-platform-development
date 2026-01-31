import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';

const ForAgencies = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const agencyAnimators = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      rating: 4.9,
      reviews: 47,
      specialization: 'Аниматор-клоун',
      status: 'active',
      lastEvent: '2 дня назад',
      totalEvents: 127
    },
    {
      id: 2,
      name: 'Дмитрий Иванов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      rating: 4.8,
      reviews: 32,
      specialization: 'Фокусник',
      status: 'active',
      lastEvent: '1 неделю назад',
      totalEvents: 89
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      rating: 5.0,
      reviews: 68,
      specialization: 'Аква-грим',
      status: 'inactive',
      lastEvent: '1 месяц назад',
      totalEvents: 156
    }
  ];

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Агентство "Праздник+"</h1>
              <p className="text-muted-foreground">Панель управления командой</p>
            </div>
            <Button variant="outline" onClick={() => setShowDashboard(false)}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: 'Users', label: 'Аниматоров', value: '12', color: 'purple' },
              { icon: 'Star', label: 'Средний рейтинг', value: '4.8', color: 'yellow' },
              { icon: 'Calendar', label: 'Мероприятий', value: '342', color: 'blue' },
              { icon: 'TrendingUp', label: 'Рост за месяц', value: '+18%', color: 'green' }
            ].map((stat, idx) => (
              <Card key={idx} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-2xl gradient-${stat.color} flex items-center justify-center mb-3`}>
                    <Icon name={stat.icon as any} className="text-white" size={24} />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="team" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="team">
                <Icon name="Users" size={16} className="mr-2" />
                Команда
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Отзывы
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="mt-6">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Ваши аниматоры</h3>
                    <Button className="gradient-purple text-white">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить аниматора
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {agencyAnimators.map((animator) => (
                      <Card key={animator.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16 border-2 border-purple-200">
                              <AvatarImage src={animator.avatar} />
                              <AvatarFallback>{animator.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2 gap-4">
                                <div>
                                  <h4 className="font-bold text-lg mb-1">{animator.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{animator.specialization}</p>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <div className="flex items-center gap-1">
                                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                                      <span className="font-semibold">{animator.rating}</span>
                                      <span className="text-sm text-muted-foreground">({animator.reviews})</span>
                                    </div>
                                    <Badge variant={animator.status === 'active' ? 'default' : 'secondary'}>
                                      {animator.status === 'active' ? 'Активен' : 'Неактивен'}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right whitespace-nowrap">
                                  <p className="text-sm text-muted-foreground mb-1">Всего мероприятий</p>
                                  <p className="text-2xl font-bold">{animator.totalEvents}</p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline">
                                  <Icon name="Eye" size={14} className="mr-2" />
                                  Профиль
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Icon name="MessageSquare" size={14} className="mr-2" />
                                  Оставить отзыв
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Icon name="BarChart3" size={14} className="mr-2" />
                                  Статистика
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-6">Отзывы от агентства</h3>
                  <p className="text-muted-foreground mb-6">
                    Оставляйте профессиональные отзывы своим аниматорам — это повысит их рейтинг и привлечёт новых клиентов
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {agencyAnimators.map((animator) => (
                      <Card key={animator.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={animator.avatar} />
                              <AvatarFallback>{animator.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold">{animator.name}</h4>
                              <p className="text-sm text-muted-foreground">{animator.specialization}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Последнее мероприятие: {animator.lastEvent}
                          </p>
                          <Button className="w-full gradient-purple text-white">
                            <Icon name="Star" size={16} className="mr-2" />
                            Оставить отзыв
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-6">Динамика рейтингов</h3>
                    <div className="space-y-6">
                      {agencyAnimators.map((animator) => (
                        <div key={animator.id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{animator.name}</span>
                            <span className="text-sm font-bold">{animator.rating}</span>
                          </div>
                          <Progress value={animator.rating * 20} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-6">Активность команды</h3>
                    <div className="space-y-4">
                      {agencyAnimators.map((animator) => (
                        <div key={animator.id} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={animator.avatar} />
                              <AvatarFallback>{animator.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{animator.name}</p>
                              <p className="text-xs text-muted-foreground">{animator.lastEvent}</p>
                            </div>
                          </div>
                          <Badge variant={animator.status === 'active' ? 'default' : 'secondary'}>
                            {animator.status === 'active' ? '●' : '○'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-2 text-sm gradient-purple text-white">
              Для агентств
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Управляйте командой
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                профессионально
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Эвента помогает агентствам управлять аниматорами, следить за рейтингами и повышать качество услуг
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gradient-purple text-white h-14 px-8" onClick={() => setShowDashboard(true)}>
                <Icon name="Sparkles" size={20} className="mr-2" />
                Попробовать демо
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8">
                <Icon name="PlayCircle" size={20} className="mr-2" />
                Смотреть видео
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: 'Users',
                title: 'Единая база аниматоров',
                desc: 'Все ваши специалисты в одном месте с рейтингами, отзывами и статистикой'
              },
              {
                icon: 'TrendingUp',
                title: 'Прозрачность и рост',
                desc: 'Отслеживайте динамику рейтингов и помогайте команде расти профессионально'
              },
              {
                icon: 'Shield',
                title: 'Репутация агентства',
                desc: 'Высокий рейтинг аниматоров повышает доверие к вашему агентству'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-blue flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 mb-20 overflow-hidden animate-fade-in">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Как это работает?</h2>
                <p className="text-muted-foreground text-lg">Простой процесс от регистрации до результата</p>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '1', title: 'Регистрация', desc: 'Создайте профиль агентства за 2 минуты', icon: 'UserPlus' },
                  { step: '2', title: 'Добавьте команду', desc: 'Пригласите аниматоров или создайте им профили', icon: 'Users' },
                  { step: '3', title: 'Управляйте', desc: 'Следите за рейтингами и оставляйте отзывы', icon: 'BarChart3' },
                  { step: '4', title: 'Растите', desc: 'Повышайте репутацию агентства и привлекайте клиентов', icon: 'TrendingUp' }
                ].map((step, idx) => (
                  <div key={idx} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-full gradient-purple flex items-center justify-center mb-4">
                        <Icon name={step.icon as any} className="text-white" size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-lg">
                        {step.step}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 px-3 py-1 text-xs gradient-orange text-white">
                Сценарий использования
              </Badge>
              <h2 className="text-4xl font-bold mb-6">Управление отзывами</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Оставляйте профессиональные отзывы своим аниматорам после каждого мероприятия.
                Это не только повышает их личный рейтинг, но и показывает клиентам, что с вашей командой работают серьёзно.
              </p>
              <div className="space-y-4">
                {[
                  'Отзывы от агентств весят больше в рейтинге',
                  'Клиенты видят профессиональную оценку',
                  'Аниматоры мотивированы работать лучше'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-purple flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Check" className="text-white" size={14} />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-2 animate-fade-in">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
                  <div className="bg-white p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                      </Avatar>
                      <div>
                        <p className="font-bold">Анна Петрова</p>
                        <p className="text-sm text-muted-foreground">Аниматор-клоун</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Отличный специалист! Анна провела уже 15 мероприятий для нашего агентства.
                      Всегда пунктуальна, креативна и находит подход к детям.
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Building2" size={12} className="mr-1" />
                        Агентство "Праздник+"
                      </Badge>
                      <span className="text-xs text-muted-foreground">3 дня назад</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <Card className="border-2 order-2 md:order-1 animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Аниматоров', value: '12', icon: 'Users' },
                        { label: 'Ср. рейтинг', value: '4.8', icon: 'Star' },
                        { label: 'Мероприятий', value: '342', icon: 'Calendar' },
                        { label: 'Рост', value: '+18%', icon: 'TrendingUp' }
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl text-center">
                          <Icon name={stat.icon as any} size={24} className="mx-auto mb-2 text-purple-500" />
                          <p className="text-2xl font-bold mb-1">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 md:order-2 animate-fade-in">
              <Badge className="mb-4 px-3 py-1 text-xs gradient-blue text-white">
                Аналитика
              </Badge>
              <h2 className="text-4xl font-bold mb-6">Следите за результатами</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Получайте полную аналитику по команде: рейтинги, количество мероприятий, динамику роста.
                Все данные в одном месте для принятия правильных решений.
              </p>
              <div className="space-y-4">
                {[
                  'Рейтинги каждого аниматора',
                  'Статистика по мероприятиям',
                  'Динамика роста команды'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-blue flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Check" className="text-white" size={14} />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="border-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden animate-fade-in">
            <CardContent className="pt-12 pb-12 text-center relative">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы начать?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Присоединяйтесь к профессиональным агентствам, которые уже управляют командой через Эвенту
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Создать профиль агентства
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Связаться с нами
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ForAgencies;