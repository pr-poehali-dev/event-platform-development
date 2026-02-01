import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ChatPanel from '@/components/ChatPanel';
import Icon from '@/components/ui/icon';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Мария К.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      role: 'Заказчик',
      lastMessage: 'Спасибо, всё было отлично!',
      timestamp: '2 мин назад',
      unread: 2,
      status: 'online',
      responseTime: 'Обычно отвечает за 1 час',
    },
    {
      id: '2',
      name: 'Сергей П.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
      role: 'Заказчик',
      lastMessage: 'Можете провести мероприятие 18 мая?',
      timestamp: '1 час назад',
      unread: 1,
      status: 'online',
      responseTime: 'Обычно отвечает за 2 часа',
    },
    {
      id: '3',
      name: 'Анастасия Л.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anastasia',
      role: 'Заказчик',
      lastMessage: 'Какая стоимость дополнительного часа?',
      timestamp: '3 часа назад',
      unread: 0,
      status: 'offline',
      responseTime: 'Обычно отвечает за 3 часа',
    },
    {
      id: '4',
      name: 'Дмитрий И.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      role: 'Заказчик',
      lastMessage: 'Вы: Конечно, всегда готов помочь!',
      timestamp: 'Вчера',
      unread: 0,
      status: 'offline',
      responseTime: 'Обычно отвечает за 2 часа',
    },
    {
      id: '5',
      name: 'Елена В.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      role: 'Заказчик',
      lastMessage: 'Отлично, жду с нетерпением!',
      timestamp: '2 дня назад',
      unread: 0,
      status: 'offline',
      responseTime: 'Обычно отвечает за 4 часа',
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Сообщения</h2>
            <p className="text-muted-foreground">
              {totalUnread > 0
                ? `У вас ${totalUnread} ${totalUnread === 1 ? 'непрочитанное сообщение' : 'непрочитанных сообщения'}`
                : 'Все сообщения прочитаны'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Поиск по чатам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-accent ${
                        selectedChat?.id === chat.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {chat.name}
                            </h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {chat.timestamp}
                            </span>
                          </div>
                          <p
                            className={`text-sm truncate ${
                              chat.unread > 0
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {chat.lastMessage}
                          </p>
                        </div>

                        {chat.unread > 0 && (
                          <Badge className="gradient-purple text-white border-0 text-xs px-2 mt-1">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredChats.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Search" size={48} className="mx-auto mb-3 opacity-20" />
                    <p>Чаты не найдены</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedChat ? (
              <Card className="h-[calc(100vh-16rem)]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-4 border-b flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {selectedChat.status === 'online' && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>Онлайн</span>
                          </div>
                        )}
                        {selectedChat.status === 'offline' && (
                          <span>{selectedChat.responseTime}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm p-4 border shadow-sm max-w-md">
                            <p className="text-sm">
                              Здравствуйте! Интересует проведение праздника для ребёнка 5 лет.
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 ml-2">
                            14:23
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 flex-row-reverse">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                          <AvatarFallback>АП</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="gradient-purple rounded-2xl rounded-tr-sm p-4 text-white shadow-sm max-w-md">
                            <p className="text-sm">
                              Здравствуйте! Конечно, с удовольствием помогу организовать праздник!
                              Расскажите подробнее о мероприятии?
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 mr-2">
                            14:25 ✓✓
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input placeholder="Введите сообщение..." className="flex-1" />
                      <button className="w-10 h-10 rounded-lg gradient-purple text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                        <Icon name="Send" size={18} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[calc(100vh-16rem)]">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">Выберите чат</p>
                    <p className="text-sm">Выберите диалог из списка слева</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {selectedChat && (
        <ChatPanel
          isOpen={false}
          onClose={() => {}}
          recipient={selectedChat}
          userType="customer"
        />
      )}
    </DashboardLayout>
  );
};

export default Messages;
