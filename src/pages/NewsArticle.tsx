import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { NEWS_DATA } from './News';

const CATEGORY_COLORS: Record<string, string> = {
  'Советы': 'bg-blue-100 text-blue-700',
  'Тренды': 'bg-purple-100 text-purple-700',
  'Для специалистов': 'bg-green-100 text-green-700',
  'Новости': 'bg-orange-100 text-orange-700',
  'Форматы': 'bg-pink-100 text-pink-700',
};

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = NEWS_DATA.find((n) => n.id === Number(id));

  if (!article) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-muted-foreground">Новость не найдена</p>
          <Button variant="outline" onClick={() => navigate('/dashboard/news')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться в ленту
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const otherArticles = NEWS_DATA.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-3xl animate-fade-in">
        {/* Назад */}
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/dashboard/news')}
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Все новости
        </Button>

        {/* Обложка */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ maxHeight: 420 }}>
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: 420 }}
          />
        </div>

        {/* Мета */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[article.category] || 'bg-muted text-muted-foreground'}`}>
            {article.category}
          </span>
          <span className="text-sm text-muted-foreground">{article.date}</span>
          <span className="text-muted-foreground">·</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={13} />
            {article.readTime}
          </span>
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-bold leading-snug mb-6">{article.title}</h1>

        {/* Контент */}
        <div className="space-y-5">
          {article.content.map((block, i) => {
            if (block.type === 'text') {
              return (
                <p key={i} className="text-base leading-relaxed text-foreground/85">
                  {block.value}
                </p>
              );
            }
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="text-xl font-bold mt-6">
                  {block.value}
                </h2>
              );
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className="my-6">
                  <img
                    src={block.value}
                    alt={block.caption}
                    className="w-full rounded-xl object-cover"
                    style={{ maxHeight: 400 }}
                  />
                  {block.caption && (
                    <figcaption className="text-sm text-center text-muted-foreground mt-2">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </div>

        {/* Читать ещё */}
        {otherArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-lg mb-4">Читать ещё</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherArticles.map((n) => (
                <div
                  key={n.id}
                  className="cursor-pointer group rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/dashboard/news/${n.id}`)}
                >
                  <div className="overflow-hidden h-32">
                    <img
                      src={n.cover}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NewsArticle;
