import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Order } from '@/pages/Orders';

const PERFORMER_TYPES = ['Аниматор', 'Ведущий', 'Фокусник', 'DJ', 'Певец', 'Фотограф', 'Танцор'];
const GENDER_OPTIONS: Array<'М' | 'Ж' | 'Не важно'> = ['М', 'Ж', 'Не важно'];

interface Props {
  onClose: () => void;
  onSubmit: (order: Order) => void;
}

const CreateOrderModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    address: '',
    date: '',
    startTime: '',
    arriveTime: '',
    duration: '',
    performerType: 'Аниматор',
    gender: 'Не важно' as 'М' | 'Ж' | 'Не важно',
    description: '',
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.address || !form.date) return;
    const order: Order = {
      id: Date.now(),
      title: form.title,
      author: { name: 'Анна Петрова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', id: 1 },
      price: Number(form.price),
      address: form.address,
      date: form.date,
      startTime: form.startTime,
      arriveTime: form.arriveTime,
      duration: form.duration,
      performerType: form.performerType,
      gender: form.gender,
      description: form.description,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onSubmit(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Шапка */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">Новый заказ</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Форма */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="space-y-1.5">
            <Label>Название заказа</Label>
            <Input
              placeholder="Например: Человек-паук на день рождения"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Цена (₽)</Label>
              <Input
                type="number"
                placeholder="5000"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Длительность</Label>
              <Input
                placeholder="2 часа"
                value={form.duration}
                onChange={(e) => set('duration', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Адрес</Label>
            <Input
              placeholder="Город, улица, дом"
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Дата</Label>
              <Input
                placeholder="25 апреля 2025"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Начало</Label>
              <Input
                placeholder="14:00"
                value={form.startTime}
                onChange={(e) => set('startTime', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Быть к</Label>
              <Input
                placeholder="13:45"
                value={form.arriveTime}
                onChange={(e) => set('arriveTime', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Тип исполнителя</Label>
            <div className="flex flex-wrap gap-2">
              {PERFORMER_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => set('performerType', t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.performerType === t
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Пол исполнителя</Label>
            <div className="flex gap-2">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => setForm((f) => ({ ...f, gender: g }))}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    form.gender === g
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea
              placeholder="Расскажите подробнее: кто придёт, что нужно сделать, особые пожелания..."
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="p-5 border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Отменить</Button>
          <Button className="flex-1 gradient-purple text-white" onClick={handleSubmit}>
            <Icon name="Send" size={15} className="mr-2" />
            Опубликовать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;
