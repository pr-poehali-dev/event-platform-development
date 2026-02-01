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
      emoji: '🎯',
      primaryAction: { label: 'Понятно, далее' },
      tooltipPosition: 'right',
    },
    {
      id: 'profile-button',
      target: '[href="/dashboard/profile"]',
      title: 'Мой профиль — ваша визитка',
      description: `Здесь вы управляете всей информацией о себе.

Клиенты смотрят профиль перед заказом — давайте посмотрим, что там важно! 👀`,
      emoji: '👤',
      primaryAction: { label: 'Открыть профиль' },
      navigateTo: '/dashboard/profile',
      tooltipPosition: 'right',
    },
    {
      id: 'edit-profile',
      target: '[data-onboarding="edit-button"]',
      title: 'Заполните информацию о себе',
      description: `Имя, специализация, опыт, цены — всё это влияет на количество заказов.

Чем полнее профиль — тем больше доверия у клиентов! 📈`,
      emoji: '✏️',
      primaryAction: { label: 'Понял, далее' },
      tooltipPosition: 'left',
    },
    {
      id: 'portfolio',
      target: '[data-onboarding="portfolio-tab"]',
      title: 'Покажите свою работу',
      description: `Портфолио — это ваша сила!
Добавьте 5-10 фото с мероприятий.

Профили с фото получают в 3 раза больше запросов! 📸`,
      emoji: '🎨',
      primaryAction: { label: 'Интересно, далее' },
      tooltipPosition: 'bottom',
    },
    {
      id: 'reviews-button',
      target: '[href="/dashboard/reviews"]',
      title: 'Отзывы — ваша репутация',
      description: `Хорошие отзывы = больше заказов.
Давайте посмотрим, как их собирать! ⭐`,
      emoji: '⭐',
      primaryAction: { label: 'Посмотреть отзывы' },
      navigateTo: '/dashboard/reviews',
      tooltipPosition: 'right',
    },
    {
      id: 'qr-code',
      target: '[data-onboarding="qr-code"]',
      title: 'QR-код для отзывов',
      description: `Покажите этот QR-код клиентам после мероприятия — они оставят отзыв за 30 секунд.

Без регистрации, просто и быстро! 🚀`,
      emoji: '📱',
      primaryAction: { label: 'Круто, далее' },
      tooltipPosition: 'left',
    },
    {
      id: 'messages-button',
      target: '[href="/dashboard/messages"]',
      title: 'Общайтесь с клиентами',
      description: `Здесь вся переписка с заказчиками.
Отвечайте быстро — это повышает рейтинг! 💬`,
      emoji: '💬',
      primaryAction: { label: 'Посмотреть чаты' },
      navigateTo: '/dashboard/messages',
      tooltipPosition: 'right',
    },
    {
      id: 'messages-list',
      target: '[data-onboarding="messages-list"]',
      title: 'Все чаты в одном месте',
      description: `Список диалогов с заказчиками.
Непрочитанные сообщения подсвечены.

Средний ответ за 2 часа = +20% к просмотрам профиля! ⚡`,
      emoji: '📬',
      primaryAction: { label: 'Понятно, далее' },
      tooltipPosition: 'right',
    },
    {
      id: 'complete',
      target: '[data-onboarding="tips-card"]',
      title: 'Отлично! Вы готовы к работе',
      description: `Теперь вы знаете все ключевые разделы!

🚀 Первый шаг: заполните профиль на 100%
💡 Добавьте 5-10 фото в портфолио
⭐ Попросите первых клиентов оставить отзывы`,
      emoji: '🎉',
      primaryAction: { label: 'Начать работу!' },
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
      return;
    }

    const timeoutId = setTimeout(() => {
      updateSpotlight();
    }, 400);

    const intervalId = setInterval(() => {
      const targetElement = document.querySelector(currentStep.target);
      if (targetElement) {
        updateSpotlight();
      }
    }, 500);

    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
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