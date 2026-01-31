import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const FAQ = () => {
  const [activeAudience, setActiveAudience] = useState<'agencies' | 'artists'>('artists');

  const faqData = {
    agencies: [
      {
        question: 'Зачем агентству Эвента, если есть свои базы и чаты?',
        answer: 'Чаты — это поток. Эвента — это структурированная база репутаций. Вы не ищете «кого-то срочно», вы выбираете проверенного специалиста по профилю, отзывам и истории работы.'
      },
      {
        question: 'Как Эвента экономит время агентства?',
        answer: 'Быстрый поиск по фильтрам, понятный рейтинг, отзывы от других агентств, один профиль вместо десятков сообщений. Меньше переписок — больше контроля.'
      },
      {
        question: 'Можно ли вести переписку с артистами прямо в Эвенте?',
        answer: 'Да. Встроенные диалоги позволяют приглашать артистов, обсуждать условия и сохранять историю общения. Без потери контекста и «а кто это вообще был».'
      },
      {
        question: 'Как агентству собирать свою команду внутри платформы?',
        answer: 'Вы можете добавлять артистов в агентский профиль, формировать пул проверенных специалистов и быстро приглашать их на проекты. Это ваша цифровая команда.'
      },
      {
        question: 'Насколько можно доверять отзывам?',
        answer: 'Отзывы разделены на отзывы от клиентов и от агентств. Есть модерация и история профиля. Репутация не создаётся за один день — и это плюс.'
      },
      {
        question: 'Что если артист сильный, но без рейтинга?',
        answer: 'Эвента не наказывает новичков. Профиль, портфолио и первые отзывы дают шанс показать уровень без «сарафана».'
      },
      {
        question: 'Подходит ли Эвента для массовых мероприятий?',
        answer: 'Да. Платформа помогает быстро закрывать составы, видеть загруженность артистов и снижать риск срывов. Особенно ценно при больших объёмах.'
      },
      {
        question: 'Это замена моему CRM?',
        answer: 'Нет. Эвента — инструмент подбора и доверия, а не бухгалтерия. Она дополняет, а не усложняет процессы.'
      },
      {
        question: 'Нужно ли переводить всю работу в Эвенту?',
        answer: 'Нет. Вы используете ровно столько, сколько удобно: профиль, переписку, поиск, отзывы. Без ломки привычных схем.'
      },
      {
        question: 'Почему агентствам выгодно быть на старте?',
        answer: 'Меньше конкуренции, больше внимания к профилю, влияние на развитие платформы и статус «первых». Вы не догоняете рынок — вы его формируете.'
      }
    ],
    artists: [
      {
        question: 'Что мне даёт Эвента как артисту?',
        answer: 'Твой профессиональный образ в одном месте: профиль, отзывы, рейтинг, портфолио и удобная связь. Без бесконечных объяснений.'
      },
      {
        question: 'Это заменит мои соцсети?',
        answer: 'Нет. Соцсети — это эмоции и стиль. Эвента — это доверие и репутация. Ты просто добавляешь ещё один сильный инструмент.'
      },
      {
        question: 'Зачем мне рейтинг и отзывы?',
        answer: 'Потому что тебе начинают доверять быстрее, тебя выбирают осознанно, ты растёшь в цене. Это не цифры — это твоя история.'
      },
      {
        question: 'А если я только начинаю?',
        answer: 'Эвента — одно из лучших мест для старта. Честный профиль, первые отзывы и видимость для агентств. Без «знакомств по знакомству».'
      },
      {
        question: 'Придётся ли сидеть в Эвенте постоянно?',
        answer: 'Нет. Оформил профиль → используешь ссылку → получаешь результат. Эвента работает даже когда ты офлайн.'
      },
      {
        question: 'Как мне получать больше заказов через платформу?',
        answer: 'Заполненный профиль, актуальное портфолио, отзывы и статус занятости. Алгоритм простой, но рабочий.'
      },
      {
        question: 'Можно ли общаться с агентствами прямо на платформе?',
        answer: 'Да. Переписка сохраняется, ты не теряешь контакты и договорённости.'
      },
      {
        question: 'Чем Эвента лучше чатов «ищу работу»?',
        answer: 'В чатах ты — сообщение. В Эвенте ты — личность и профессионал. Тебя находят, а не ты кричишь о себе.'
      },
      {
        question: 'Это подойдёт только аниматорам?',
        answer: 'Нет. Всем, кто работает на мероприятиях: ведущие, артисты, фокусники, визажисты, декораторы, кейтеринг. Если ты в эвенте — ты в Эвенте.'
      },
      {
        question: 'Почему стоит зарегистрироваться сейчас?',
        answer: 'Ты среди первых, меньше конкуренции, больше внимания и сильная позиция на будущее. Рынок будет расти. Вопрос — ты внутри или наблюдаешь со стороны.'
      }
    ]
  };

  const currentFAQ = faqData[activeAudience];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 px-4 py-2 text-sm gradient-purple text-white">
            Ответы на вопросы
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Есть вопросы?
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Мы ответим
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите свою роль и узнайте, как Эвента поможет вам работать эффективнее
          </p>
        </div>

        {/* Переключатель аудитории */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-white rounded-full p-1.5 shadow-lg border-2 border-purple-100">
            <button
              onClick={() => setActiveAudience('artists')}
              className={`
                relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-out
                ${activeAudience === 'artists'
                  ? 'gradient-purple text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <Icon name="Sparkles" size={18} />
                Для эвентеров
              </span>
            </button>
            <button
              onClick={() => setActiveAudience('agencies')}
              className={`
                relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-out
                ${activeAudience === 'agencies'
                  ? 'gradient-blue text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <Icon name="Building2" size={18} />
                Для агентств
              </span>
            </button>
          </div>
        </div>

        {/* FAQ Аккордеон */}
        <Card className="border-2 shadow-xl animate-fade-in overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {currentFAQ.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-purple-100 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-5">
                    <div className="flex items-start gap-3 pr-4">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                        ${activeAudience === 'artists' ? 'gradient-purple' : 'gradient-blue'}
                        group-hover:scale-110
                      `}>
                        <Icon name="HelpCircle" className="text-white" size={16} />
                      </div>
                      <span className="font-semibold text-base md:text-lg text-gray-800 group-hover:text-purple-600 transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-11 pr-4 pb-5 text-base leading-relaxed animate-accordion-down">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA под FAQ */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              size="lg" 
              className="gradient-purple text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              {activeAudience === 'artists' ? 'Создать профиль артиста' : 'Зарегистрировать агентство'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <Icon name="Users" size={20} className="mr-2" />
              Посмотреть примеры профилей
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
            Эвента не заменяет Telegram — она дополняет вашу работу структурой, доверием и репутацией
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
