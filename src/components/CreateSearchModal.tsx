import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { SearchRequest } from '@/data/searchRequests';

interface Props {
  onClose: () => void;
  onSubmit: (req: SearchRequest) => void;
}

const CATEGORY_OPTIONS = ['Реквизит', 'Костюм', 'Оборудование', 'Декор', 'Свет/Звук', 'Другое'];

const CreateSearchModal = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('Реквизит');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !city.trim()) return;
    onSubmit({
      id: Date.now(),
      title,
      description,
      date: date || 'Не указано',
      city,
      budget: budget ? Number(budget) : undefined,
      category,
      deadline: deadline || 'Не указано',
      author: { name: 'Анна Петрова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
      createdAt: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Шапка */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎒</span>
            <h3 className="font-bold text-base">Новая заявка в Ищейку</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Форма */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Категория */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Категория</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    category === c
                      ? 'gradient-orange text-white border-transparent'
                      : 'bg-muted/50 text-muted-foreground border-border hover:border-orange-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Название */}
          <div className="space-y-1.5">
            <Label htmlFor="sr-title">Что ищешь? <span className="text-destructive">*</span></Label>
            <Input
              id="sr-title"
              placeholder="Например: Нужна колонка JBL на 2 часа"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Описание */}
          <div className="space-y-1.5">
            <Label htmlFor="sr-desc">Подробности</Label>
            <textarea
              id="sr-desc"
              rows={3}
              placeholder="Опиши подробнее: размер, цвет, мощность, особые требования..."
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Дата + Город */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="sr-date">Дата / период</Label>
              <Input
                id="sr-date"
                placeholder="25 апр – 1 мая"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sr-city">Город <span className="text-destructive">*</span></Label>
              <Input
                id="sr-city"
                placeholder="Москва"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* Бюджет + Актуально до */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="sr-budget">Бюджет (₽)</Label>
              <Input
                id="sr-budget"
                type="number"
                placeholder="Необязательно"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sr-deadline">Актуально до</Label>
              <Input
                id="sr-deadline"
                placeholder="30 апреля"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="p-5 border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Отмена</Button>
          <Button
            className="flex-1 gradient-orange text-white border-0 hover:opacity-90"
            onClick={handleSubmit}
            disabled={!title.trim() || !city.trim()}
          >
            <Icon name="Search" size={15} className="mr-2" />
            Опубликовать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSearchModal;
