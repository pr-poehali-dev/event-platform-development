import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      author: 'Мария К.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      rating: 5,
      date: '2 дня назад',
      text: 'Анна просто супер! Дети были в восторге от программы. Профессиональный подход, отличное взаимодействие с детьми. Обязательно обратимся снова!',
      event: 'День рождения Макса',
    },
    {
      id: 2,
      author: 'Сергей П.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
      rating: 5,
      date: '5 дней назад',
      text: 'Отличный аниматор! Очень рекомендую. Все прошло на высшем уровне.',
      event: 'Детский праздник',
    },
    {
      id: 3,
      author: 'Анастасия Л.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anastasia',
      rating: 4,
      date: '1 неделю назад',
      text: 'Хорошая программа, дети довольны. Единственное - хотелось бы больше интерактива.',
      event: 'Выпускной в детском саду',
    },
    {
      id: 4,
      author: 'Дмитрий И.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      rating: 5,
      date: '2 недели назад',
      text: 'Всё было идеально! Анна смогла увлечь даже самых застенчивых детей. Спасибо огромное!',
      event: 'День рождения Сони',
    },
    {
      id: 5,
      author: 'Елена В.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      rating: 5,
      date: '3 недели назад',
      text: 'Профессионал своего дела! Рекомендую всем друзьям.',
      event: 'Семейный праздник',
    },
  ];

  const stats = {
    totalReviews: 47,
    averageRating: 4.9,
    ratings: [
      { stars: 5, count: 40, percentage: 85 },
      { stars: 4, count: 5, percentage: 11 },
      { stars: 3, count: 2, percentage: 4 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Отзывы</h2>
            <p className="text-muted-foreground">
              Управляйте отзывами и получайте обратную связь
            </p>
          </div>
          <Button className="gradient-purple text-white">
            <Icon name="Share2" size={18} className="mr-2" />
            Поделиться QR-кодом
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
                  {stats.averageRating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < Math.floor(stats.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  На основе {stats.totalReviews} отзывов
                </p>
              </div>

              <div className="space-y-3">
                {stats.ratings.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium">{rating.stars}</span>
                      <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <Progress value={rating.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {rating.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t" data-onboarding="qr-code">
                <h4 className="font-semibold mb-3">QR-код для отзывов</h4>
                <div className="bg-white p-4 rounded-xl border">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eventa.dev/review/anna-petrova"
                    alt="QR Code"
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-3 mb-3">
                  Клиенты могут отсканировать QR-код и оставить отзыв
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать QR-код
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Последние отзывы</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтр
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold mb-1">{review.author}</h4>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={14}
                                  className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {review.event}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{review.text}</p>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        Полезно
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Ответить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="gradient-purple text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Повышайте рейтинг</h4>
                    <p className="text-sm opacity-90 mb-3">
                      Отвечайте на отзывы клиентов и получайте больше заказов. 
                      Артисты с активными ответами получают на 40% больше запросов.
                    </p>
                    <Button variant="secondary" size="sm">
                      Узнать как
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;