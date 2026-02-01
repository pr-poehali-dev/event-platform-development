import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OnboardingWelcomeProps {
  isOpen: boolean;
  userName: string;
  onStart: () => void;
  onSkip: () => void;
}

const OnboardingWelcome = ({ isOpen, userName, onStart, onSkip }: OnboardingWelcomeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onSkip}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-2">
        <div className="gradient-purple p-12 text-white relative overflow-hidden">
          <div className="absolute top-10 right-10 animate-float">
            <Icon name="Sparkles" size={48} className="text-white/30" />
          </div>
          <div className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: '1s' }}>
            <Icon name="Star" size={36} className="text-white/20" />
          </div>
          <div className="absolute top-1/2 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Icon name="Award" size={40} className="text-white/25" />
          </div>

          <div className="relative z-10 text-center">
            <div className="text-6xl mb-6 animate-scale-in">🎉</div>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              Добро пожаловать в Эвенту!
            </h1>
            <p className="text-xl text-white/90 mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {userName}, ваш профиль создан!
            </p>
            <p className="text-lg text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Сейчас я покажу, что здесь к чему
            </p>
          </div>
        </div>

        <div className="p-8 bg-white">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold text-sm mb-1">Профиль</h3>
              <p className="text-xs text-muted-foreground">Ваша визитка</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-sm mb-1">Отзывы</h3>
              <p className="text-xs text-muted-foreground">Репутация</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-sm mb-1">Сообщения</h3>
              <p className="text-xs text-muted-foreground">Клиенты</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Icon name="Clock" size={16} />
            <span>Это займёт всего 2 минуты</span>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 gradient-purple text-white text-lg py-6"
              onClick={onStart}
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать знакомство
            </Button>
            <Button variant="ghost" className="px-6" onClick={onSkip}>
              Разберусь сам
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Вы всегда можете вернуться к обучению в настройках
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWelcome;
