import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { icon: 'Home', label: 'Главная', path: '/dashboard', badge: null },
    { icon: 'User', label: 'Мой профиль', path: '/dashboard/profile', badge: null },
    { icon: 'MessageCircle', label: 'Чаты', path: '/dashboard/messages', badge: 3 },
    { icon: 'Calendar', label: 'Календарь', path: '/dashboard/calendar', badge: null },
    { icon: 'Star', label: 'Отзывы', path: '/dashboard/reviews', badge: null },
    { icon: 'Trophy', label: 'Рейтинг', path: '/dashboard/rating', badge: null },
    { icon: 'ClipboardList', label: 'Заказы', path: '/dashboard/orders', badge: null },
    { icon: 'Newspaper', label: 'Новости', path: '/dashboard/news', badge: null },
    { icon: 'BarChart3', label: 'Статистика', path: '/dashboard/stats', badge: null },
    { icon: 'Settings', label: 'Настройки', path: '/dashboard/settings', badge: null },
  ];

  const secondaryItems = [
    { icon: 'BookOpen', label: 'База знаний', path: '/dashboard/knowledge', badge: null },
    { icon: 'Briefcase', label: 'Эвента Про', path: '/dashboard/pro', badge: null },
    { icon: 'Headphones', label: 'Поддержка', path: '/dashboard/support', badge: null },
    { icon: 'FileText', label: 'Документы', path: '/dashboard/documents', badge: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">Э</span>
              </div>
              <span className="font-bold text-lg">Эвента</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-sidebar-accent"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative group ${
                  isActive(item.path)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                {isActive(item.path) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 gradient-purple rounded-r-full" />
                )}
                <Icon name={item.icon} size={20} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge className="gradient-purple text-white border-0 text-xs px-2">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-sidebar-border px-2">
            <nav className="space-y-1">
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    isActive(item.path) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Анна Петрова</p>
                <p className="text-xs text-muted-foreground">Аниматор-клоун</p>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-sidebar-accent">
                <Icon name="LogOut" size={18} />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="w-full hover:bg-sidebar-accent">
              <Icon name="LogOut" size={20} />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;