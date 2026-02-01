import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import OnboardingWelcome from '@/components/OnboardingWelcome';
import OnboardingTour from '@/components/OnboardingTour';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const isOnboardingCompleted = localStorage.getItem('onboarding_completed') === 'true';
    const isNewUser = localStorage.getItem('user_registered') === 'true';

    if (isNewUser && !isOnboardingCompleted) {
      setShowWelcome(true);
      localStorage.removeItem('user_registered');
    }
  }, []);
  const upcomingEvents = [
    {
      id: 1,
      date: '15 мая, СБ',
      time: '14:00',
      title: 'День рождения Макса',
      client: 'Мария К.',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      location: 'Москва, ул. Ленина 25',
      status: 'confirmed',
    },
    {
      id: 2,
      date: '18 мая, ВТ',
      time: '16:30',
      title: 'Детский праздник',
      client: 'Сергей П.',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
      location: 'Санкт-Петербург',
      status: 'pending',
    },
  ];

  const quickStats = [
    { icon: 'Eye', label: 'Просмотры', value: '245', change: '+12%', trend: 'up' },
    { icon: 'MessageCircle', label: 'Запросы', value: '18', change: '+5', trend: 'up' },
    { icon: 'Calendar', label: 'Мероприятия', value: '7', change: '2 новых', trend: 'neutral' },
    { icon: 'Star', label: 'Рейтинг', value: '4.9', change: '47 отзывов', trend: 'up' },
  ];

  const tips = [
    {
      icon: 'Camera',
      title: 'Обновите портфолио',
      description: 'Добавьте фото с последних мероприятий',
      action: 'Добавить фото',
    },
    {
      icon: 'MessageCircle',
      title: 'Ответьте на запросы',
      description: 'У вас 2 непрочитанных сообщения',
      action: 'Перейти к чатам',
    },
  ];

  return (
    <DashboardLayout 
      onboardingActive={showTour}
      onOnboardingComplete={() => setShowTour(false)}
      onOnboardingSkip={() => setShowTour(false)}
    >
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold mb-2">Привет, Анна! 👋</h2>
          <p className="text-muted-foreground">Сегодня у вас 2 новых запроса на мероприятия</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg gradient-purple flex items-center justify-center">
                    <Icon name={stat.icon} size={24} className="text-white" />
                  </div>
                  {stat.trend === 'up' && (
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Ближайшие события</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Calendar" size={16} className="mr-2" />
                Календарь
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="w-16 h-16 rounded-xl gradient-purple flex flex-col items-center justify-center text-white">
                          <span className="text-xs font-medium">МАЙ</span>
                          <span className="text-2xl font-bold">15</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Icon name="Clock" size={14} />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="MapPin" size={14} />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Badge
                            className={
                              event.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {event.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={event.clientAvatar} />
                              <AvatarFallback>{event.client[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{event.client}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="MessageCircle" size={16} className="mr-2" />
                              Написать
                            </Button>
                            <Button size="sm" className="gradient-purple text-white">
                              Детали
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Советы для роста</h3>
            <div className="space-y-3" data-onboarding="tips-card">
              {tips.map((tip, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                        <Icon name={tip.icon} size={20} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                        <p className="text-xs text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {tip.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="gradient-purple text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Icon name="Zap" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Эвента Про</h4>
                    <p className="text-sm opacity-90">
                      Получайте больше заказов с премиум-аккаунтом
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  Узнать больше
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <OnboardingWelcome
        isOpen={showWelcome}
        userName="Анна"
        onStart={() => {
          setShowWelcome(false);
          setShowTour(true);
          localStorage.setItem('onboarding_active', 'true');
        }}
        onSkip={() => {
          setShowWelcome(false);
          localStorage.setItem('onboarding_completed', 'true');
        }}
      />
    </DashboardLayout>
  );
};

export default Dashboard;