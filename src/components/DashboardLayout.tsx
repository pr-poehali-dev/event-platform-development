import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import OnboardingTour from '@/components/OnboardingTour';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface DashboardLayoutProps {
  children: ReactNode;
  onboardingActive?: boolean;
  onOnboardingComplete?: () => void;
  onOnboardingSkip?: () => void;
}

const DashboardLayout = ({ 
  children, 
  onboardingActive = false,
  onOnboardingComplete,
  onOnboardingSkip 
}: DashboardLayoutProps) => {
  const [showOnboarding, setShowOnboarding] = useState(onboardingActive);

  useEffect(() => {
    setShowOnboarding(onboardingActive);
  }, [onboardingActive]);

  useEffect(() => {
    const isOnboardingCompleted = localStorage.getItem('onboarding_completed') === 'true';
    const onboardingState = localStorage.getItem('onboarding_active') === 'true';
    
    if (onboardingState && !isOnboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Личный кабинет</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 gradient-purple text-white text-xs border-0">
                  2
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                      <AvatarFallback>АП</AvatarFallback>
                    </Avatar>
                    <Icon name="ChevronDown" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">Анна Петрова</p>
                    <p className="text-xs text-muted-foreground">anna@example.com</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="User" size={16} className="mr-2" />
                    Мой профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    Моя статистика
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="Eye" size={16} className="mr-2" />
                    Просмотр как клиент
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Globe" size={16} className="mr-2" />
                    Вернуться на сайт
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>

      <OnboardingTour
        isActive={showOnboarding}
        onComplete={() => {
          setShowOnboarding(false);
          localStorage.removeItem('onboarding_active');
          localStorage.setItem('onboarding_completed', 'true');
          if (onOnboardingComplete) onOnboardingComplete();
        }}
        onSkip={() => {
          setShowOnboarding(false);
          localStorage.removeItem('onboarding_active');
          localStorage.setItem('onboarding_completed', 'true');
          if (onOnboardingSkip) onOnboardingSkip();
        }}
      />
    </div>
  );
};

export default DashboardLayout;