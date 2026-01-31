import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface SmartHintProps {
  userType: 'customer' | 'performer' | 'agency';
  onDismiss: () => void;
}

const SmartHint = ({ userType, onDismiss }: SmartHintProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const hints = {
    customer: {
      title: '💡 Расскажите артисту о мероприятии:',
      items: [
        'Дата и время проведения',
        'Возраст детей / формат события',
        'Локация проведения',
        'Ваш бюджет (опционально)',
      ],
    },
    performer: {
      title: '💡 Представьтесь и расскажите:',
      items: [
        'Ваш опыт работы в сфере',
        'Доступные даты',
        'Условия сотрудничества',
        'Примеры ваших программ',
      ],
    },
    agency: {
      title: '💡 Опишите ваши услуги:',
      items: [
        'Состав вашей команды',
        'Портфолио выполненных работ',
        'Условия работы',
        'Специализация агентства',
      ],
    },
  };

  const hint = hints[userType];

  if (!isVisible) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4 shadow-sm relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-blue-100"
          onClick={onDismiss}
        >
          <Icon name="X" size={14} />
        </Button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <Icon name="Lightbulb" size={20} className="text-white" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-3">{hint.title}</h4>
            <ul className="space-y-2">
              {hint.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <Icon name="CheckCircle2" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-700 flex items-center gap-1">
            <Icon name="Info" size={12} />
            Чем подробнее опишете запрос, тем точнее будет ответ
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartHint;
