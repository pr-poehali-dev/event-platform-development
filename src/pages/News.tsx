import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const NEWS_DATA = [
  {
    id: 1,
    title: 'Как правильно готовиться к детскому дню рождения: советы профи',
    excerpt: 'Рассказываем, как выбрать аниматора, организовать пространство и сделать так, чтобы дети не скучали ни минуты.',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    category: 'Советы',
    date: '14 апреля 2025',
    readTime: '4 мин',
    content: [
      { type: 'text', value: 'Детский день рождения — это целый ивент, к которому стоит готовиться заранее. Мы собрали советы от лучших аниматоров платформы Эвента, чтобы ваш праздник прошёл идеально.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000', caption: 'Весёлые конкурсы — залог хорошего настроения' },
      { type: 'heading', value: '1. Определитесь с форматом заранее' },
      { type: 'text', value: 'Выбирайте тему праздника исходя из интересов ребёнка. Супергерои, принцессы, динозавры — любая тема задаёт тон всему мероприятию: костюмам, декору, играм и торту.' },
      { type: 'heading', value: '2. Бронируйте аниматора заранее' },
      { type: 'text', value: 'Хороших специалистов разбирают быстро, особенно в выходные и праздничные дни. Оптимально — за 2–3 недели. Изучите отзывы, посмотрите портфолио и убедитесь, что аниматор работает с нужной возрастной группой.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1000', caption: 'Профессиональный аниматор всегда найдёт подход к детям' },
      { type: 'heading', value: '3. Продумайте зонирование' },
      { type: 'text', value: 'Выделите место для игр, зону для угощений и уголок для тихого отдыха. Дети устают от шума и иногда хотят просто посидеть с книжкой или конструктором.' },
    ],
  },
  {
    id: 2,
    title: 'Топ-5 трендов корпоративных мероприятий в 2025 году',
    excerpt: 'Иммерсивные форматы, геймификация, живые перформансы — что выбирают компании для своих ивентов в этом году.',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    category: 'Тренды',
    date: '9 апреля 2025',
    readTime: '5 мин',
    content: [
      { type: 'text', value: 'Корпоративные мероприятия меняются: компании уходят от скучных банкетов и выбирают нестандартные форматы, которые объединяют команду и оставляют впечатление.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000', caption: 'Современный корпоратив — это опыт, а не просто ужин' },
      { type: 'heading', value: '1. Иммерсивные форматы' },
      { type: 'text', value: 'Квесты, перформансы, театральные шоу с участием гостей — когда человек не зритель, а участник, впечатление остаётся навсегда.' },
      { type: 'heading', value: '2. Геймификация' },
      { type: 'text', value: 'Командные игры, интеллектуальные турниры, бизнес-симуляции — всё это отлично работает как тимбилдинг.' },
      { type: 'heading', value: '3. Живые перформансы' },
      { type: 'text', value: 'Живая музыка, стендап, джазовый ансамбль — атмосфера живого выступления несравнима с плейлистом.' },
    ],
  },
  {
    id: 3,
    title: 'Как аниматору создать профиль, который продаёт',
    excerpt: 'Разбираем, что должно быть в профиле исполнителя, чтобы клиенты выбирали именно вас.',
    cover: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    category: 'Для специалистов',
    date: '2 апреля 2025',
    readTime: '3 мин',
    content: [
      { type: 'text', value: 'Профиль на Эвенте — это ваша витрина. Клиент принимает решение за первые 10 секунд. Вот что важно сделать правильно.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000', caption: 'Профессиональное фото увеличивает конверсию в 3 раза' },
      { type: 'heading', value: 'Фотография — главное' },
      { type: 'text', value: 'Используйте качественное фото в образе, при хорошем свете. Аватарка с чёткого фото на нейтральном фоне работает лучше всего.' },
      { type: 'heading', value: 'Заполните "О себе" полностью' },
      { type: 'text', value: 'Напишите, с кем вы работаете, что умеете, чем отличаетесь. 3–5 предложений, конкретно и живо — без шаблонов.' },
      { type: 'heading', value: 'Собирайте отзывы' },
      { type: 'text', value: 'После каждого мероприятия просите клиента оставить отзыв. Это главный инструмент доверия на платформе.' },
    ],
  },
  {
    id: 4,
    title: 'Свадьба без стресса: как выбрать ведущего',
    excerpt: 'Ведущий — ключевая фигура свадьбы. Рассказываем, на что обратить внимание при выборе и какие вопросы задать на встрече.',
    cover: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800',
    category: 'Советы',
    date: '28 марта 2025',
    readTime: '6 мин',
    content: [
      { type: 'text', value: 'Ведущий задаёт тон всей свадьбе. Он управляет темпом, создаёт атмосферу и держит гостей в хорошем настроении. Выбрать его — одно из самых важных решений.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1000', caption: 'Хороший ведущий чувствует аудиторию' },
      { type: 'heading', value: 'Смотрите видео, а не только фото' },
      { type: 'text', value: 'Попросите ссылку на видео с реальных мероприятий. Манера говорить, реакция зала, энергетика — это невозможно передать фотографией.' },
      { type: 'heading', value: 'Встретьтесь лично или по видеосвязи' },
      { type: 'text', value: 'Личный контакт решает всё. Вам должно быть комфортно с этим человеком — он проведёт с вами один из важнейших дней жизни.' },
    ],
  },
  {
    id: 5,
    title: 'Эвента запускает новые функции для специалистов',
    excerpt: 'Теперь в профиле можно добавлять видео, настраивать доступность и получать уведомления о новых запросах.',
    cover: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800',
    category: 'Новости',
    date: '20 марта 2025',
    readTime: '2 мин',
    content: [
      { type: 'text', value: 'Мы продолжаем развивать платформу для специалистов в event-индустрии. В этом обновлении — несколько важных улучшений.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1000', caption: 'Новый интерфейс профиля специалиста' },
      { type: 'heading', value: 'Видео в профиле' },
      { type: 'text', value: 'Теперь можно добавить ссылку на YouTube или загрузить видео напрямую. Клиенты смогут увидеть вас в деле ещё до первого контакта.' },
      { type: 'heading', value: 'Календарь доступности' },
      { type: 'text', value: 'Укажите свободные даты — и клиенты будут видеть только актуальные слоты для бронирования.' },
    ],
  },
  {
    id: 6,
    title: 'Детские квесты: почему это лучший формат для дня рождения',
    excerpt: 'Квесты захватывают детей с первой минуты и дают незабываемый опыт. Рассказываем, как это работает.',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    category: 'Форматы',
    date: '14 марта 2025',
    readTime: '4 мин',
    content: [
      { type: 'text', value: 'Квесты стали одним из самых популярных форматов детских праздников. И неудивительно: дети погружаются в историю, решают задачки вместе и чувствуют себя настоящими героями.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000', caption: 'Детский квест — это приключение для всей компании' },
      { type: 'heading', value: 'Как устроен квест' },
      { type: 'text', value: 'Аниматор создаёт историю под тему праздника, придумывает загадки и прячет подсказки. Дети идут по цепочке заданий и в финале находят «сокровище» — обычно это сладкий подарок.' },
      { type: 'heading', value: 'Для какого возраста подходит' },
      { type: 'text', value: 'Квесты хорошо работают с детьми от 5 лет. До этого возраста детям сложно удерживать нить истории — лучше выбрать подвижные игры.' },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Советы': 'bg-blue-100 text-blue-700',
  'Тренды': 'bg-purple-100 text-purple-700',
  'Для специалистов': 'bg-green-100 text-green-700',
  'Новости': 'bg-orange-100 text-orange-700',
  'Форматы': 'bg-pink-100 text-pink-700',
};

const News = () => {
  const navigate = useNavigate();
  const [featured, ...rest] = NEWS_DATA;

  return (
    <DashboardLayout>
      <div className="max-w-5xl animate-fade-in space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-1">Лента новостей</h2>
          <p className="text-muted-foreground">Советы, тренды и обновления платформы</p>
        </div>

        {/* Главная новость */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{ minHeight: 360 }}
          onClick={() => navigate(`/dashboard/news/${featured.id}`)}
        >
          <img
            src={featured.cover}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${CATEGORY_COLORS[featured.category] || 'bg-white/20 text-white'}`}>
              {featured.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">{featured.title}</h3>
            <p className="text-white/80 text-sm mb-3 max-w-xl">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <span>{featured.date}</span>
              <span>·</span>
              <Icon name="Clock" size={12} />
              <span>{featured.readTime}</span>
            </div>
          </div>
        </div>

        {/* Остальные новости */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((news) => (
            <div
              key={news.id}
              className="group cursor-pointer rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => navigate(`/dashboard/news/${news.id}`)}
            >
              <div className="overflow-hidden h-44">
                <img
                  src={news.cover}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[news.category] || 'bg-muted text-muted-foreground'}`}>
                  {news.category}
                </span>
                <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{news.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <span>{news.date}</span>
                  <span>·</span>
                  <Icon name="Clock" size={11} />
                  <span>{news.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
