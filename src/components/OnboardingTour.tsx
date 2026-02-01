import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingTooltip from './OnboardingTooltip';

interface OnboardingStep {
  id: string;
  target: string;
  title: string;
  description: string;
  emoji: string;
  primaryAction: {
    label: string;
    onClick?: () => void;
  };
  navigateTo?: string;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
}

interface OnboardingTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTour = ({ isActive, onComplete, onSkip }: OnboardingTourProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const steps: OnboardingStep[] = [
    {
      id: 'sidebar',
      target: 'aside',
      title: 'Это ваше главное меню',
      description: `Здесь вы найдёте все инструменты:
• Профиль — ваша визитка
• Сообщения — переписка с клиентами
• Отзывы — ваша репутация
• Календарь — график работы

Можно свернуть, нажав на стрелку`,
      emoji: '💬',
      primaryAction: { label: 'Далее' },
      tooltipPosition: 'right',
    },
    {
      id: 'profile',
      target: '[href="/dashboard/profile"]',
      title: 'Начните с профиля',
      description: `Это первое, что видят клиенты.
Добавьте фото, опишите свои услуги и укажите цены.

Чем полнее профиль — тем больше заказов 📈`,
      emoji: '👤',
      primaryAction: { label: 'Заполнить профиль' },
      navigateTo: '/dashboard/profile',
      tooltipPosition: 'right',
    },
    {
      id: 'portfolio',
      target: '[data-onboarding="portfolio-tab"]',
      title: 'Покажите свою работу',
      description: `Портфолио — это ваша сила.
Добавьте 5-10 фото с мероприятий, чтобы клиенты увидели, как вы работаете.

Профили с фото получают в 3 раза больше запросов!`,
      emoji: '📸',
      primaryAction: { label: 'Добавить фото' },
      tooltipPosition: 'bottom',
    },
    {
      id: 'reviews',
      target: '[href="/dashboard/reviews"]',
      title: 'Собирайте отзывы легко',
      description: `Покажите клиентам QR-код после мероприятия — они оставят отзыв без регистрации.

Рейтинг 4.5+ = топ выдачи в поиске 🚀`,
      emoji: '⭐',
      primaryAction: { label: 'Посмотреть' },
      navigateTo: '/dashboard/reviews',
      tooltipPosition: 'right',
    },
    {
      id: 'messages',
      target: '[href="/dashboard/messages"]',
      title: 'Клиенты уже пишут вам!',
      description: `Здесь вся переписка с заказчиками.
Отвечайте быстро — это повышает ваш рейтинг в системе.

Средний ответ за 2 часа = +20% к просмотрам`,
      emoji: '💬',
      primaryAction: { label: 'Посмотреть чаты' },
      navigateTo: '/dashboard/messages',
      tooltipPosition: 'right',
    },
    {
      id: 'complete',
      target: '[data-onboarding="tips-card"]',
      title: 'Готово! Вы разобрались',
      description: `Теперь вы знаете, где что находится.
Если забудете — всегда можно вернуться к подсказкам в настройках.

🚀 Первый шаг: заполните профиль на 100%`,
      emoji: '🎉',
      primaryAction: { label: 'В личный кабинет' },
      navigateTo: '/dashboard',
      tooltipPosition: 'bottom',
    },
  ];

  const currentStep = steps[currentStepIndex];

  const updateSpotlight = useCallback(() => {
    if (!currentStep) return;

    const targetElement = document.querySelector(currentStep.target);
    if (!targetElement) {
      console.warn(`Target not found: ${currentStep.target}`);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    setSpotlightRect(rect);

    const padding = 12;
    const tooltipWidth = 400;
    const tooltipHeight = 300;

    let top = 0;
    let left = 0;

    switch (currentStep.tooltipPosition) {
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + padding + 20;
        if (left + tooltipWidth > window.innerWidth) {
          left = rect.left - tooltipWidth - padding - 20;
        }
        break;
      case 'bottom':
        top = rect.bottom + padding + 20;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        if (left < padding) left = padding;
        if (left + tooltipWidth > window.innerWidth - padding) {
          left = window.innerWidth - tooltipWidth - padding;
        }
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - padding - 20;
        if (left < padding) {
          left = rect.right + padding + 20;
        }
        break;
      case 'top':
        top = rect.top - tooltipHeight - padding - 20;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        if (top < padding) top = rect.bottom + padding + 20;
        break;
      default:
        top = rect.bottom + padding + 20;
        left = rect.left;
    }

    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

    setTooltipPosition({ top, left });
  }, [currentStep]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep?.navigateTo && location.pathname !== currentStep.navigateTo) {
      navigate(currentStep.navigateTo);
    }

    const timeoutId = setTimeout(() => {
      updateSpotlight();
    }, 300);

    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight);
    };
  }, [isActive, currentStep, currentStepIndex, location.pathname, navigate, updateSpotlight]);

  const handleNext = () => {
    if (currentStep.primaryAction.onClick) {
      currentStep.primaryAction.onClick();
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onSkip();
  };

  if (!isActive || !currentStep) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={handleSkip}
      />

      {spotlightRect && (
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-300"
          style={{
            top: spotlightRect.top - 8,
            left: spotlightRect.left - 8,
            width: spotlightRect.width + 16,
            height: spotlightRect.height + 16,
            boxShadow: `
              0 0 0 4px rgba(168, 85, 247, 0.4),
              0 0 0 9999px rgba(0, 0, 0, 0.6)
            `,
            borderRadius: '12px',
          }}
        />
      )}

      <OnboardingTooltip
        title={currentStep.title}
        description={currentStep.description}
        emoji={currentStep.emoji}
        currentStep={currentStepIndex + 1}
        totalSteps={steps.length}
        primaryButton={{
          label: currentStep.primaryAction.label,
          onClick: handleNext,
        }}
        onSkip={handleSkip}
        position={tooltipPosition}
      />
    </>
  );
};

export default OnboardingTour;
