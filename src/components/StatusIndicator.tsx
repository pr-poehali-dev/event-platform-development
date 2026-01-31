import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export type UserStatus = 'available' | 'later' | 'busy' | 'offline';

interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  pulse?: boolean;
}

const statusConfig: Record<UserStatus, StatusConfig> = {
  available: {
    label: 'Онлайн сейчас',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    icon: 'Circle',
    pulse: true
  },
  later: {
    label: 'Отвечу позже',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    icon: 'Clock'
  },
  busy: {
    label: 'На мероприятии',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: 'Sparkles'
  },
  offline: {
    label: '',
    color: 'text-slate-400',
    bgColor: 'bg-slate-50 border-slate-200',
    icon: 'Circle'
  }
};

interface StatusIndicatorProps {
  status: UserStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function StatusIndicator({ status, size = 'md', showLabel = true, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  if (status === 'offline' && !showLabel) return null;

  const iconSize = size === 'sm' ? 8 : size === 'md' ? 12 : 16;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Icon 
        name={config.icon as any} 
        size={iconSize}
        className={cn(
          config.color,
          config.pulse && 'animate-pulse',
          config.icon === 'Circle' && 'fill-current'
        )}
      />
      {showLabel && config.label && (
        <span className={cn(
          'font-medium',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          config.color
        )}>
          {config.label}
        </span>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: UserStatus;
  compact?: boolean;
}

export function StatusBadge({ status, compact = false }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  if (status === 'offline') return null;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'flex items-center gap-1.5',
        config.bgColor,
        config.color,
        'border',
        compact && 'px-2 py-0.5'
      )}
    >
      <Icon 
        name={config.icon as any}
        size={compact ? 8 : 10}
        className={cn(
          'shrink-0',
          config.pulse && 'animate-pulse',
          config.icon === 'Circle' && 'fill-current'
        )}
      />
      {!compact && <span className="text-xs font-medium">{config.label}</span>}
    </Badge>
  );
}

interface StatusCardProps {
  status: UserStatus;
  responseTime?: string;
  availableHours?: string;
  className?: string;
}

export function StatusCard({ status, responseTime, availableHours, className }: StatusCardProps) {
  const config = statusConfig[status];
  
  if (status === 'offline') return null;

  const descriptions: Record<UserStatus, string> = {
    available: responseTime || 'Обычно отвечает за 10 минут',
    later: availableHours || 'Обычно онлайн днём',
    busy: responseTime || 'Отвечу после мероприятия',
    offline: ''
  };

  return (
    <div className={cn(
      'p-4 rounded-lg border',
      config.bgColor,
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon 
            name={config.icon as any}
            size={20}
            className={cn(
              config.color,
              config.pulse && 'animate-pulse'
            )}
          />
        </div>
        <div className="flex-1">
          <div className={cn('font-semibold mb-1', config.color.replace('600', '900'))}>
            {config.label}
          </div>
          <div className={cn('text-sm', config.color.replace('600', '700'))}>
            {descriptions[status]}
          </div>
        </div>
      </div>
    </div>
  );
}
