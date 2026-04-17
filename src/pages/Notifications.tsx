import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { MOCK_NOTIFICATIONS, NOTIFICATION_META } from '@/data/notifications';
import type { Notification, NotificationType } from '@/data/notifications';

const FILTERS: { key: 'all' | NotificationType; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'news', label: 'Новости' },
  { key: 'review', label: 'Отзывы' },
  { key: 'support', label: 'Поддержка' },
  { key: 'system', label: 'Система' },
];

const NotificationCard = ({
  n,
  onRead,
}: {
  n: Notification;
  onRead: (id: string) => void;
}) => {
  const meta = NOTIFICATION_META[n.type];
  const navigate = useNavigate();

  const handleClick = () => {
    onRead(n.id);
    if (n.link) navigate(n.link);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer
        ${!n.read
          ? 'bg-primary/5 border-primary/20 hover:bg-primary/8'
          : 'bg-card border-border hover:bg-muted/50'
        }`}
    >
      {/* Иконка типа */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${meta.color}`}>
        <Icon name={meta.icon} size={18} />
      </div>

      {/* Контент */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>
              {n.title}
            </span>
            <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal">
              {meta.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
            <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.text}</p>
        {n.link && (
          <span className="text-xs text-primary mt-1.5 inline-flex items-center gap-1 hover:opacity-70">
            Перейти <Icon name="ArrowRight" size={11} />
          </span>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | NotificationType>('all');

  const unread = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(
    n => filter === 'all' || n.type === filter
  );

  const handleRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl animate-fade-in space-y-6">
        {/* Шапка */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1 flex items-center gap-3">
              Уведомления
              {unread > 0 && (
                <Badge className="gradient-orange text-white border-0 text-sm px-2">
                  {unread} новых
                </Badge>
              )}
            </h2>
            <p className="text-muted-foreground">Все уведомления в одном месте</p>
          </div>
          {unread > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAll}>
              <Icon name="CheckCheck" size={14} className="mr-1.5" />
              Прочитать все
            </Button>
          )}
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => {
            const count = f.key === 'all'
              ? notifications.filter(n => !n.read).length
              : notifications.filter(n => n.type === f.key && !n.read).length;
            const isActive = filter === f.key;

            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border
                  ${isActive
                    ? 'gradient-orange text-white border-transparent shadow-sm'
                    : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted'
                  }`}
              >
                {f.key !== 'all' && (
                  <Icon name={NOTIFICATION_META[f.key as NotificationType].icon} size={13} />
                )}
                {f.label}
                {count > 0 && (
                  <span className={`text-[10px] rounded-full px-1 min-w-[16px] text-center ${isActive ? 'bg-white/20' : 'bg-primary/15 text-primary'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Список */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="BellOff" size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-base">Уведомлений нет</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(n => (
              <NotificationCard key={n.id} n={n} onRead={handleRead} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
