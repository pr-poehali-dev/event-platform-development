import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type Role = 'animator' | 'agency' | 'guest' | null;
type AuthMethod = 'telegram' | 'phone' | 'email' | null;

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [profileData, setProfileData] = useState({
    photo: '',
    firstName: '',
    lastName: '',
    city: '',
    specialization: ''
  });

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    if (selectedRole === 'guest') {
      onComplete();
    } else {
      setTimeout(() => setStep(2), 300);
    }
  };

  const handleAuthSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    setTimeout(() => setStep(3), 800);
  };

  const handleProfileSubmit = () => {
    setTimeout(() => setStep(4), 300);
  };

  const handleFinish = () => {
    setTimeout(() => onComplete(), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? 'w-12 gradient-purple' : s < step ? 'w-8 bg-purple-300' : 'w-8 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Шаг {step} из 3
            </p>
          </div>
        )}

        <div className="animate-fade-in">
          {step === 1 && (
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-purple flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold mb-3">
                Добро пожаловать в <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Эвенту</span>
              </h1>
              <p className="text-muted-foreground">
                Выберите, как вы хотите использовать платформу
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <Card
                className="cursor-pointer border-2 hover:border-purple-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleRoleSelect('animator')}
              >
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shrink-0">
                    <Icon name="Sparkles" className="text-white" size={28} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-1">Я аниматор</h3>
                    <p className="text-sm text-muted-foreground">
                      Создать профиль и получать заказы
                    </p>
                  </div>
                  <Icon name="ChevronRight" className="ml-auto text-muted-foreground" size={24} />
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer border-2 hover:border-pink-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleRoleSelect('agency')}
              >
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center shrink-0">
                    <Icon name="Building2" className="text-white" size={28} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-1">Я агентство</h3>
                    <p className="text-sm text-muted-foreground">
                      Управлять командой аниматоров
                    </p>
                  </div>
                  <Icon name="ChevronRight" className="ml-auto text-muted-foreground" size={24} />
                </CardContent>
              </Card>

              <button
                className="w-full text-center py-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => handleRoleSelect('guest')}
              >
                Просто посмотреть →
              </button>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-blue flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-3">Быстрый вход</h2>
                <p className="text-muted-foreground">
                  Без паролей и сложных форм
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg bg-[#0088cc] hover:bg-[#0077b3] text-white"
                  onClick={() => handleAuthSelect('telegram')}
                >
                  <Icon name="Send" size={24} className="mr-3" />
                  Войти через Telegram
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-16 text-lg"
                  onClick={() => handleAuthSelect('phone')}
                >
                  <Icon name="Phone" size={24} className="mr-3" />
                  Войти по номеру телефона
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-16 text-lg"
                  onClick={() => handleAuthSelect('email')}
                >
                  <Icon name="Mail" size={24} className="mr-3" />
                  Войти по email
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-6">
                Нажимая "Войти", вы соглашаетесь с условиями использования
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Создайте профиль</h2>
                <p className="text-muted-foreground">
                  Это займёт всего минуту
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-6 space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <Avatar className="w-24 h-24 border-4 border-purple-200 cursor-pointer group-hover:border-purple-400 transition-colors">
                        <AvatarImage src={profileData.photo} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100">
                          <Icon name="Camera" size={32} className="text-purple-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-purple flex items-center justify-center cursor-pointer">
                        <Icon name="Plus" className="text-white" size={18} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Добавить фото</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                        Имя
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Анна"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                        Фамилия
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Петрова"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium mb-2 block">
                      Город
                    </Label>
                    <Input
                      id="city"
                      placeholder="Москва"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialization" className="text-sm font-medium mb-2 block">
                      Специализация
                    </Label>
                    <Input
                      id="specialization"
                      placeholder="Аниматор-клоун"
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg gradient-purple text-white"
                    onClick={handleProfileSubmit}
                    disabled={!profileData.firstName || !profileData.lastName || !profileData.city}
                  >
                    Создать профиль
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Остальное заполните позже в личном кабинете
              </p>
            </>
          )}

          {step === 4 && (
            <div className="text-center animate-scale-in">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-purple flex items-center justify-center animate-pulse">
                  <Icon name="Check" className="text-white" size={40} />
                </div>
                <h2 className="text-4xl font-bold mb-3">
                  Готово! 🎉
                </h2>
                <p className="text-xl text-muted-foreground">
                  Ваш профиль создан
                </p>
              </div>

              <Card className="border-2 border-purple-200 mb-6 overflow-hidden">
                <div className="h-24 gradient-purple"></div>
                <CardContent className="pt-0">
                  <div className="relative -mt-12 mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl mx-auto">
                      <AvatarImage src={profileData.photo} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-2xl font-bold">
                        {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <h3 className="text-2xl font-bold mb-1">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-muted-foreground mb-3">{profileData.specialization}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="secondary">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {profileData.city}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={20} className="text-gray-300" />
                      <span className="font-bold text-lg text-muted-foreground">0.0</span>
                    </div>
                    <span className="text-muted-foreground text-sm">Новый профиль</span>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mb-4">
                    <p className="text-sm font-medium mb-3 text-center">Ваш QR-код для отзывов</p>
                    <div className="bg-white p-4 rounded-xl inline-block">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eventa.dev/review/${Date.now()}`}
                        alt="QR Code"
                        className="w-32 h-32 mx-auto"
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg gradient-purple text-white"
                    onClick={handleFinish}
                  >
                    Перейти в профиль
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground">
                Заполните портфолио и опыт работы в личном кабинете
              </p>
            </div>
          )}
        </div>

        {step > 1 && step < 4 && (
          <button
            className="w-full text-center py-4 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4"
            onClick={() => setStep(step - 1)}
          >
            ← Назад
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
