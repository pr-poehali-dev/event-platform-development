import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SPECIALIST = {
  name: 'Анна Петрова',
  role: 'Аниматор · Ведущий',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
};

const RATING_LABELS: Record<number, { text: string; emoji: string; color: string }> = {
  1: { text: 'Можно лучше', emoji: '😔', color: 'text-red-400' },
  2: { text: 'Не очень', emoji: '😕', color: 'text-orange-400' },
  3: { text: 'Хорошо', emoji: '😊', color: 'text-yellow-500' },
  4: { text: 'Очень хорошо', emoji: '😄', color: 'text-lime-500' },
  5: { text: 'Отлично!', emoji: '🔥', color: 'text-emerald-500' },
};

type ReviewType = 'event' | 'personal' | null;

/* ── Звёзды ── */
const Stars = ({ rating, hovered, onHover, onLeave, onClick }: {
  rating: number; hovered: number;
  onHover: (v: number) => void; onLeave: () => void; onClick: (v: number) => void;
}) => {
  const active = hovered || rating;
  return (
    <div className="flex items-center justify-center gap-2.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          onMouseEnter={() => onHover(s)}
          onMouseLeave={onLeave}
          onClick={() => onClick(s)}
          className="focus:outline-none transition-all duration-150"
          style={{
            transform: active >= s ? 'scale(1.2)' : 'scale(1)',
            filter: active >= s ? 'drop-shadow(0 2px 8px rgba(255,122,24,0.4))' : 'none',
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={active >= s ? '#FF7A18' : '#e5e7eb'}
              stroke={active >= s ? '#FF7A18' : '#d1d5db'}
              strokeWidth="1"
              strokeLinejoin="round"
              style={{ transition: 'fill 0.15s, stroke 0.15s' }}
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

const LeaveReview = () => {
  const navigate = useNavigate();
  const [reviewType, setReviewType] = useState<ReviewType>(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeRating = hovered || rating;
  const label = activeRating ? RATING_LABELS[activeRating] : null;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(f => {
      const reader = new FileReader();
      reader.onload = ev => setPhotos(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const handleSubmit = () => {
    if (!rating) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
  };

  /* ── Финальный экран ── */
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #fff7f0 0%, #fff 60%)' }}>
        <div className="text-center space-y-6 max-w-sm w-full animate-fade-in">
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FF7A18, #ffb347)' }}>
            🙌
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Спасибо!</h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Ваш отзыв отправлен.<br />Он поможет другим сделать правильный выбор.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full h-12 text-base font-semibold rounded-2xl text-white border-0"
              style={{ background: 'linear-gradient(135deg, #FF7A18, #ffb347)' }}
              onClick={() => navigate('/dashboard/profile')}
            >
              Перейти в профиль
            </Button>
            <Button variant="ghost" className="w-full h-11 text-gray-400 text-sm" onClick={() => navigate('/dashboard')}>
              На главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #fff7f0 0%, #fff 55%)' }}>
      <div className="max-w-lg mx-auto px-5 py-8 space-y-6">

        {/* ── Hero ── */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <Avatar className="w-20 h-20 shadow-md ring-4 ring-white">
              <AvatarImage src={SPECIALIST.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-orange-100 text-orange-500">А</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow text-base">⭐</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{SPECIALIST.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{SPECIALIST.role}</p>
          </div>
          <p className="text-sm text-gray-400">Это займёт меньше минуты 👇</p>
        </div>

        {/* ── Выбор типа отзыва ── */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600 text-center">Как вы знаете этого специалиста?</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Карточка: мероприятие */}
            <button
              onClick={() => setReviewType('event')}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-3xl border-2 text-left transition-all duration-200 group ${
                reviewType === 'event'
                  ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-100'
                  : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm'
              }`}
            >
              {reviewType === 'event' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: 'linear-gradient(135deg, #FF7A18, #ffb347)' }}>✓</span>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                reviewType === 'event' ? 'shadow-md' : 'bg-orange-50 group-hover:scale-105'
              }`} style={reviewType === 'event' ? { background: 'linear-gradient(135deg, #FF7A18, #ffb347)' } : {}}>
                🎉
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Был на мероприятии</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">Видел его в деле на конкретном событии</p>
              </div>
            </button>

            {/* Карточка: личное знакомство */}
            <button
              onClick={() => setReviewType('personal')}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-3xl border-2 text-left transition-all duration-200 group ${
                reviewType === 'personal'
                  ? 'border-violet-400 bg-violet-50 shadow-md shadow-violet-100'
                  : 'border-gray-100 bg-white hover:border-violet-200 hover:shadow-sm'
              }`}
            >
              {reviewType === 'personal' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-violet-500">✓</span>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                reviewType === 'personal' ? 'shadow-md bg-violet-500' : 'bg-violet-50 group-hover:scale-105'
              }`}>
                🤝
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Знаю лично</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">Коллега, знакомый или работали вместе</p>
              </div>
            </button>
          </div>
        </div>

        {/* ── Доп. поля для мероприятия ── */}
        {reviewType === 'event' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100/60 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">🎉</span>
              <p className="text-sm font-semibold text-gray-700">О мероприятии</p>
              <span className="text-xs text-gray-300 ml-auto">необязательно</span>
            </div>
            <input
              type="text"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              placeholder="Тип события (день рождения, свадьба…)"
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <input
              type="text"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              placeholder="Примерная дата (апрель 2025)"
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        )}

        {/* ── Блок звёзд (появляется после выбора типа) ── */}
        {reviewType && (
          <div className={`bg-white rounded-3xl p-6 shadow-sm space-y-4 animate-fade-in border ${
            reviewType === 'event' ? 'border-orange-100/60' : 'border-violet-100/60'
          }`}>
            <p className="text-sm font-semibold text-gray-600 text-center">Ваша оценка</p>
            <Stars
              rating={rating}
              hovered={hovered}
              onHover={setHovered}
              onLeave={() => setHovered(0)}
              onClick={setRating}
            />
            {label ? (
              <p className={`text-center text-base font-semibold animate-fade-in ${label.color}`}>
                {label.emoji} {label.text}
              </p>
            ) : (
              <p className="text-center text-sm text-gray-300">Нажмите на звёздочку</p>
            )}
          </div>
        )}

        {/* ── Текст отзыва (появляется после выбора типа) ── */}
        {reviewType && (
          <div className={`bg-white rounded-3xl p-5 shadow-sm space-y-3 animate-fade-in border ${
            reviewType === 'event' ? 'border-orange-100/60' : 'border-violet-100/60'
          }`}>
            <p className="text-sm font-semibold text-gray-600">Ваш отзыв</p>
            <textarea
              rows={5}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={
                reviewType === 'event'
                  ? 'Расскажите, как прошло мероприятие… что понравилось, что запомнилось 😊'
                  : 'Расскажите, как вы знаете этого специалиста и что можете о нём сказать…'
              }
              className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">{text.length} символов</span>
              {text.length > 0 && <span className="text-xs text-emerald-500">✓ Хорошо!</span>}
            </div>
          </div>
        )}

        {/* ── Фото (только для мероприятия) ── */}
        {reviewType === 'event' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100/60 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">Фото с мероприятия</p>
              <span className="text-xs text-gray-300">необязательно</span>
            </div>
            {photos.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {photos.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt="" className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />
                    <button
                      onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800/70 rounded-full flex items-center justify-center"
                    >
                      <Icon name="X" size={10} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl border-2 border-dashed border-orange-200 text-orange-400 text-sm font-medium hover:bg-orange-50 transition-colors"
            >
              <Icon name="ImagePlus" size={17} />
              Добавить фото
            </button>
            <p className="text-xs text-gray-300 text-center">Фото сделают отзыв более полезным</p>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhoto} />
          </div>
        )}

        {/* ── Кнопка отправки ── */}
        {reviewType && (
          <div className="space-y-3 pb-8 animate-fade-in">
            <button
              onClick={handleSubmit}
              disabled={!rating || submitting}
              className="w-full h-14 rounded-2xl text-white font-bold text-base shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: rating
                  ? reviewType === 'event'
                    ? 'linear-gradient(135deg, #FF7A18, #ffb347)'
                    : 'linear-gradient(135deg, #7c3aed, #a78bfa)'
                  : '#e5e7eb',
              }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Отправляем…
                </>
              ) : (
                <>
                  <Icon name="Star" size={18} />
                  Оставить отзыв
                </>
              )}
            </button>
            {!rating && (
              <p className="text-center text-xs text-gray-300">Сначала поставьте оценку ⭐</p>
            )}
            <button
              onClick={() => navigate(-1)}
              className="w-full text-sm text-gray-300 hover:text-gray-400 transition-colors py-1"
            >
              Отмена
            </button>
          </div>
        )}

        {/* Заглушка когда тип ещё не выбран */}
        {!reviewType && (
          <div className="pb-8">
            <button
              onClick={() => navigate(-1)}
              className="w-full text-sm text-gray-300 hover:text-gray-400 transition-colors py-2"
            >
              Отмена
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeaveReview;
