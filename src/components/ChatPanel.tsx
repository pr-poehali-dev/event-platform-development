import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Message from '@/components/Message';
import SmartHint from '@/components/SmartHint';
import InviteModal from '@/components/InviteModal';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    status: 'online' | 'offline';
    responseTime?: string;
  };
  userType: 'customer' | 'performer' | 'agency';
}

interface MessageType {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'invitation';
  invitation?: {
    title: string;
    date: string;
    location: string;
  };
}

const ChatPanel = ({ isOpen, onClose, recipient, userType }: ChatPanelProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setShowHint(false);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg)
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'read' } : msg)
      );
    }, 1000);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: MessageType = {
          id: (Date.now() + 1).toString(),
          text: 'Спасибо за сообщение! Отвечу в ближайшее время.',
          sender: 'them',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInvite = (inviteData: { title: string; date: string; location: string; details: string }) => {
    const inviteMessage: MessageType = {
      id: Date.now().toString(),
      text: inviteData.details,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'invitation',
      invitation: {
        title: inviteData.title,
        date: inviteData.date,
        location: inviteData.location,
      },
    };

    setMessages([...messages, inviteMessage]);
    setShowInviteModal(false);
    setShowHint(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div 
        className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300"
      >
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                  <AvatarImage src={recipient.avatar} />
                  <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                </Avatar>
                {recipient.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 truncate">{recipient.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {recipient.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {recipient.status === 'online' ? (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Онлайн
                      </span>
                    ) : (
                      recipient.responseTime || 'Не в сети'
                    )}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-white/60 rounded-full"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="MessageCircle" size={32} className="text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Начните диалог с {recipient.name}</h4>
              <p className="text-sm text-muted-foreground">
                💡 Расскажите о вашем мероприятии, и артист ответит в ближайшее время
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={recipient.avatar} />
                    <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}

          {showHint && messages.length === 0 && (
            <SmartHint userType={userType} onDismiss={() => setShowHint(false)} />
          )}
        </div>

        <div className="border-t bg-white">
          {userType === 'customer' && (
            <div className="p-3 border-b flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => window.open(`/profile/${recipient.id}`, '_blank')}
              >
                <Icon name="User" size={16} className="mr-2" />
                Открыть профиль
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => setShowInviteModal(true)}
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Пригласить
              </Button>
            </div>
          )}

          <div className="p-4">
            <div className="flex items-end gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="mb-1 hover:bg-gray-100 rounded-full"
              >
                <Icon name="Paperclip" size={20} className="text-gray-600" />
              </Button>
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                  }}
                  placeholder="Написать сообщение..."
                  className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  rows={1}
                  style={{ maxHeight: '120px' }}
                />
              </div>
              <Button 
                size="icon"
                disabled={!inputValue.trim()}
                onClick={handleSend}
                className="mb-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-transform hover:scale-110"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <InviteModal 
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInvite}
        recipientName={recipient.name}
      />
    </>
  );
};

export default ChatPanel;
