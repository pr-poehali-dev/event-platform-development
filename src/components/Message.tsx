import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MessageProps {
  message: {
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
  };
}

const Message = ({ message }: MessageProps) => {
  const isMe = message.sender === 'me';

  if (message.type === 'invitation' && message.invitation) {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
        <div className={`max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">🎉 Приглашение на мероприятие</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <p className="font-bold text-gray-900">{message.invitation.title}</p>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Icon name="Calendar" size={14} />
                <span>{message.invitation.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Icon name="MapPin" size={14} />
                <span>{message.invitation.location}</span>
              </div>
              {message.text && (
                <p className="text-sm text-gray-600 pt-2 border-t">{message.text}</p>
              )}
            </div>

            {!isMe && (
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Icon name="Check" size={14} className="mr-1" />
                  Принять
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Icon name="MessageSquare" size={14} className="mr-1" />
                  Уточнить
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 px-2">
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            {isMe && message.status && (
              <div className="flex items-center">
                {message.status === 'sent' && <Icon name="Check" size={12} className="text-gray-400" />}
                {message.status === 'delivered' && (
                  <div className="flex -space-x-1">
                    <Icon name="Check" size={12} className="text-gray-400" />
                    <Icon name="Check" size={12} className="text-gray-400" />
                  </div>
                )}
                {message.status === 'read' && (
                  <div className="flex -space-x-1">
                    <Icon name="Check" size={12} className="text-purple-600" />
                    <Icon name="Check" size={12} className="text-purple-600" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isMe && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=default" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        )}
        
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1`}>
          <div
            className={`rounded-2xl px-4 py-2.5 shadow-sm ${
              isMe
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
            }`}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
          </div>
          
          <div className="flex items-center gap-1 px-2">
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            {isMe && message.status && (
              <div className="flex items-center">
                {message.status === 'sent' && <Icon name="Check" size={12} className="text-gray-400" />}
                {message.status === 'delivered' && (
                  <div className="flex -space-x-1">
                    <Icon name="Check" size={12} className="text-gray-400" />
                    <Icon name="Check" size={12} className="text-gray-400" />
                  </div>
                )}
                {message.status === 'read' && (
                  <div className="flex -space-x-1">
                    <Icon name="Check" size={12} className="text-purple-600" />
                    <Icon name="Check" size={12} className="text-purple-600" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
