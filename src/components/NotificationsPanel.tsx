import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_NOTIFICATIONS, NOTIFICATION_META } from '@/data/notifications';
import type { Notification } from '@/data/notifications';

const NotificationItem = ({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) => {
  const meta = NOTIFICATION_META[notification.type];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-muted/60 transition-colors rounded-lg ${!notification.read ? 'bg-muted/30' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${meta.color}`}>
        <Icon name={meta.icon} size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm leading-tight ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.text}</p>
        <p className="text-[11px] text-muted-foreground/70 mt-1">{notification.time}</p>
      </div>
    </button>
  );
};

const NotificationsPanel = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const preview = notifications.slice(0, 4);

  const handleItemClick = (n: Notification) => {
    setNotifications(prev =>
      prev.map(x => (x.id === n.id ? { ...x, read: true } : x))
    );
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  const handleMarkAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 gradient-orange text-white text-xs border-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 overflow-hidden"
        sideOffset={8}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Уведомления</h3>
            {unreadCount > 0 && (
              <Badge className="gradient-orange text-white text-[10px] h-4 px-1.5 border-0">
                {unreadCount} новых
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Прочитать все
            </button>
          )}
        </div>

        {/* Список */}
        <div className="p-1.5 space-y-0.5 max-h-72 overflow-y-auto">
          {preview.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              <Icon name="BellOff" size={28} className="mx-auto mb-2 opacity-30" />
              Нет уведомлений
            </div>
          ) : (
            preview.map(n => (
              <NotificationItem key={n.id} notification={n} onClick={() => handleItemClick(n)} />
            ))
          )}
        </div>

        {/* Футер */}
        <div className="border-t px-4 py-2.5">
          <button
            onClick={() => { setOpen(false); navigate('/dashboard/notifications'); }}
            className="w-full flex items-center justify-end gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          >
            Открыть все уведомления
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsPanel;
