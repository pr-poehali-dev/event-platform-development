import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-purple flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Мы создаём
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                профессиональное сообщество
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Эвента — это платформа для аниматоров, артистов и агентств, где репутация строится на реальных отзывах,
              а профессионализм виден с первого взгляда
            </p>
          </div>

          <Card className="border-2 mb-16 overflow-hidden animate-fade-in">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <Badge className="mb-4 px-4 py-2 gradient-orange text-white">
                  Наша миссия
                </Badge>
                <h2 className="text-4xl font-bold mb-6">Зачем мы это делаем?</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Мы знаем, как сложно искать аниматора в бесконечных Telegram-чатах. Резюме теряются, отзывы разбросаны,
                  невозможно понять, кому можно доверять.
                </p>
                <p>
                  <strong className="text-foreground">Эвента меняет это.</strong> Мы создали пространство, где каждый специалист имеет
                  профессиональную страницу с портфолио, проверенными отзывами и честным рейтингом.
                </p>
                <p>
                  Это не просто каталог — это живое сообщество, где репутация имеет значение, а качество работы видно всем.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: 'Shield',
                title: 'Прозрачность',
                desc: 'Все отзывы реальны. Система QR-кодов гарантирует, что отзыв оставил настоящий клиент'
              },
              {
                icon: 'Users',
                title: 'Сообщество',
                desc: 'Мы объединяем аниматоров, агентства и клиентов в одном профессиональном пространстве'
              },
              {
                icon: 'TrendingUp',
                title: 'Рост',
                desc: 'Платформа помогает специалистам расти профессионально и привлекать больше клиентов'
              }
            ].map((value, idx) => (
              <Card key={idx} className="border-2 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-blue flex items-center justify-center">
                    <Icon name={value.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 mb-16 overflow-hidden animate-fade-in">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <Badge className="mb-4 px-4 py-2 gradient-purple text-white">
                  Наши принципы
                </Badge>
                <h2 className="text-4xl font-bold mb-6">Чем мы отличаемся?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    title: 'Никаких фейковых отзывов',
                    desc: 'Только реальные клиенты через QR-коды',
                    icon: 'ShieldCheck'
                  },
                  {
                    title: 'Разделение отзывов',
                    desc: 'От клиентов и от агентств отдельно',
                    icon: 'Users'
                  },
                  {
                    title: 'Модерация контента',
                    desc: 'Мы следим за качеством информации',
                    icon: 'Eye'
                  },
                  {
                    title: 'Профессиональные профили',
                    desc: 'Как LinkedIn, но для event-сферы',
                    icon: 'Briefcase'
                  },
                  {
                    title: 'Прозрачный рейтинг',
                    desc: 'Понятная система оценки специалистов',
                    icon: 'Star'
                  },
                  {
                    title: 'Без хаоса',
                    desc: 'Всё структурировано и удобно',
                    icon: 'Sparkles'
                  }
                ].map((principle, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shrink-0">
                      <Icon name={principle.icon as any} className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{principle.title}</h4>
                      <p className="text-muted-foreground">{principle.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mb-16 animate-fade-in">
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 gradient-blue text-white">
                Как работают отзывы
              </Badge>
              <h2 className="text-4xl font-bold mb-6">Доверие через прозрачность</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Наша система отзывов честная и прозрачная
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Мероприятие прошло',
                  desc: 'Аниматор показывает QR-код клиенту после праздника',
                  icon: 'QrCode'
                },
                {
                  step: '2',
                  title: 'Быстрая оценка',
                  desc: 'Клиент сканирует QR и оставляет отзыв за 30 секунд без регистрации',
                  icon: 'Smartphone'
                },
                {
                  step: '3',
                  title: 'Проверка и публикация',
                  desc: 'Модерация проверяет отзыв, и он появляется в профиле',
                  icon: 'CheckCircle'
                }
              ].map((step, idx) => (
                <Card key={idx} className="border-2 relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold flex items-center justify-center text-xl">
                    {step.step}
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <div className="w-16 h-16 mb-4 rounded-2xl gradient-purple flex items-center justify-center">
                      <Icon name={step.icon as any} className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-2 mb-16 animate-fade-in">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Для кого Эвента?</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Animator',
                    role: 'Аниматоры',
                    quote: 'Создайте профессиональный профиль, собирайте отзывы и привлекайте новых клиентов',
                    benefits: ['Личная страница-портфолио', 'Проверенные отзывы', 'Рост рейтинга']
                  },
                  {
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agency',
                    role: 'Агентства',
                    quote: 'Управляйте командой, следите за рейтингами и повышайте репутацию бренда',
                    benefits: ['Панель управления', 'Аналитика команды', 'Профессиональные отзывы']
                  },
                  {
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Client',
                    role: 'Клиенты',
                    quote: 'Находите проверенных специалистов с реальными отзывами для своих праздников',
                    benefits: ['Честные рейтинги', 'Удобный поиск', 'Прозрачные цены']
                  }
                ].map((persona, idx) => (
                  <Card key={idx} className="border-2 hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-6 text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-purple-200">
                        <AvatarImage src={persona.avatar} />
                        <AvatarFallback>{persona.role.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-bold mb-3">{persona.role}</h3>
                      <p className="text-muted-foreground mb-6 italic">"{persona.quote}"</p>
                      <div className="space-y-2 text-left">
                        {persona.benefits.map((benefit, bidx) => (
                          <div key={bidx} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full gradient-purple flex items-center justify-center shrink-0">
                              <Icon name="Check" className="text-white" size={12} />
                            </div>
                            <p className="text-sm text-muted-foreground">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden animate-fade-in">
            <CardContent className="pt-16 pb-16 text-center relative">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Станьте частью Эвенты
                </h2>
                <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
                  Присоединяйтесь к профессиональному сообществу event-индустрии.
                  Создайте профиль за 2 минуты и начните строить репутацию
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" variant="secondary" className="h-16 px-10 text-lg">
                    <Icon name="Sparkles" size={24} className="mr-2" />
                    Создать профиль
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20">
                    <Icon name="Users" size={24} className="mr-2" />
                    Смотреть профили
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white blur-2xl" />
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-16 animate-fade-in">
            <p className="text-muted-foreground mb-4">Есть вопросы?</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="outline">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать в поддержку
              </Button>
              <Button variant="outline">
                <Icon name="Send" size={16} className="mr-2" />
                Telegram-канал
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
