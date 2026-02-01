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

const ArtistProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const portfolioImages = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  ];

  return (
    <DashboardLayout 
      onboardingActive={false}
    >
      <div className="max-w-5xl animate-fade-in space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Мой профиль</h2>
            <p className="text-muted-foreground">Управляйте своим профилем и настройками</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? '' : 'gradient-purple text-white'}
            data-onboarding="edit-button"
          >
            <Icon name={isEditing ? 'X' : 'Edit'} size={18} className="mr-2" />
            {isEditing ? 'Отменить' : 'Редактировать'}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="general">Основное</TabsTrigger>
            <TabsTrigger value="portfolio" data-onboarding="portfolio-tab">Портфолио</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                        <AvatarFallback>АП</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="icon"
                          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-purple text-white"
                        >
                          <Icon name="Camera" size={16} />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">Анна Петрова</h3>
                      <p className="text-muted-foreground mb-2">anna@example.com</p>
                      <div className="flex items-center gap-2">
                        <Badge className="gradient-purple text-white border-0">
                          <Icon name="Star" size={12} className="mr-1" />
                          4.9
                        </Badge>
                        <Badge variant="outline">47 отзывов</Badge>
                        <Badge variant="outline">5 лет опыта</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя и фамилия</Label>
                      <Input
                        id="name"
                        defaultValue="Анна Петрова"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Специализация</Label>
                      <Input
                        id="specialization"
                        defaultValue="Аниматор-клоун"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Опыт работы</Label>
                      <Input
                        id="experience"
                        defaultValue="5 лет"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ageGroup">Возрастная группа</Label>
                      <Input
                        id="ageGroup"
                        defaultValue="3-10 лет"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about">О себе</Label>
                    <Textarea
                      id="about"
                      rows={4}
                      defaultValue="Профессиональный аниматор с опытом работы на детских праздниках. Работаю с детьми от 3 до 10 лет. Создаю яркие и незабываемые праздники для ваших детей!"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+7 (999) 123-45-67"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Город</Label>
                      <Input
                        id="location"
                        defaultValue="Москва"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button className="gradient-purple text-white">
                        <Icon name="Check" size={18} className="mr-2" />
                        Сохранить изменения
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отменить
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Портфолио</h3>
                      <p className="text-sm text-muted-foreground">
                        Фотографии с ваших мероприятий
                      </p>
                    </div>
                    <Button className="gradient-purple text-white">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить фото
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {portfolioImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary" className="w-8 h-8">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button size="icon" variant="destructive" className="w-8 h-8">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-border rounded-lg h-48 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer">
                      <Icon name="Upload" size={32} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Загрузить фото</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Стоимость услуг</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Базовая цена за час</Label>
                        <div className="relative">
                          <Input
                            id="price"
                            type="number"
                            defaultValue="3000"
                            disabled={!isEditing}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₽
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minDuration">Минимальная продолжительность</Label>
                        <Input
                          id="minDuration"
                          defaultValue="2 часа"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Дополнительные услуги</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Аквагрим', price: '+500₽' },
                        { name: 'Твистинг (фигуры из шаров)', price: '+300₽' },
                        { name: 'Проведение конкурсов', price: 'Включено' },
                      ].map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <span className="font-medium">{service.name}</span>
                          <Badge variant="secondary">{service.price}</Badge>
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить услугу
                        </Button>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button className="gradient-purple text-white">
                        <Icon name="Check" size={18} className="mr-2" />
                        Сохранить изменения
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отменить
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Предпросмотр профиля</h3>
                  <p className="text-sm text-muted-foreground">
                    Так ваш профиль видят клиенты
                  </p>
                </div>
                <div className="border rounded-lg p-6 bg-muted/30">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                      <AvatarFallback>АП</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mb-2">Анна Петрова</h2>
                    <p className="text-lg text-muted-foreground mb-3">Аниматор-клоун</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="gradient-purple text-white border-0">
                        <Icon name="Star" size={12} className="mr-1" />
                        4.9
                      </Badge>
                      <Badge variant="outline">47 отзывов</Badge>
                      <Badge variant="outline">5 лет опыта</Badge>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      Профессиональный аниматор с опытом работы на детских праздниках.
                      Работаю с детьми от 3 до 10 лет.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
                      3000₽/час
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button className="gradient-purple text-white">
                        <Icon name="MessageCircle" size={18} className="mr-2" />
                        Написать
                      </Button>
                      <Button variant="outline">
                        <Icon name="Phone" size={18} className="mr-2" />
                        Позвонить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ArtistProfile;