import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface OnboardingTooltipProps {
  title: string;
  description: string;
  emoji: string;
  currentStep: number;
  totalSteps: number;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
  onSkip: () => void;
  position: { top?: number; left?: number; right?: number; bottom?: number };
}

const OnboardingTooltip = ({
  title,
  description,
  emoji,
  currentStep,
  totalSteps,
  primaryButton,
  onSkip,
  position,
}: OnboardingTooltipProps) => {
  return (
    <div
      className="fixed z-[10001] animate-scale-in"
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <Card className="max-w-md shadow-2xl border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl flex-shrink-0">{emoji}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>
                Шаг {currentStep} из {totalSteps}
              </span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} />
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 gradient-purple text-white"
              onClick={primaryButton.onClick}
            >
              {primaryButton.label}
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
            <Button variant="ghost" onClick={onSkip}>
              Пропустить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTooltip;
