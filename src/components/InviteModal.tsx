import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; date: string; location: string; details: string }) => void;
  recipientName: string;
}

const InviteModal = ({ isOpen, onClose, onSubmit, recipientName }: InviteModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', date: '', location: '', details: '' });
  };

  const isFormValid = formData.title && formData.date && formData.location;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Пригласить на мероприятие</DialogTitle>
              <DialogDescription>
                Отправьте приглашение для {recipientName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Icon name="Sparkles" size={14} />
              Название мероприятия
            </Label>
            <Input
              id="title"
              placeholder="День рождения Маши"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Icon name="Calendar" size={14} />
              Дата и время
            </Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <Icon name="MapPin" size={14} />
              Локация
            </Label>
            <Input
              id="location"
              placeholder="Москва, ул. Ленина 10"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="flex items-center gap-2">
              <Icon name="FileText" size={14} />
              Детали мероприятия (опционально)
            </Label>
            <Textarea
              id="details"
              placeholder="Укажите количество гостей, возраст детей, особые пожелания..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <Icon name="Info" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Приглашение будет отправлено в чат как красивая карточка. Артист сможет принять его или задать уточняющие вопросы.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              disabled={!isFormValid}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Отправить приглашение
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
