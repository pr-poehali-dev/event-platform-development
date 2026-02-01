import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userRole, setUserRole] = useState<'artist' | 'agency'>('artist');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate('/dashboard');
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate('/dashboard');
    }, 1500);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Доброе утро", emoji: "☀️" };
    if (hour < 18) return { text: "Добрый день", emoji: "👋" };
    return { text: "Добрый вечер", emoji: "🌙" };
  };

  const greeting = getGreeting();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden border-2">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Visual Block */}
          <div className="hidden lg:flex gradient-purple p-12 flex-col justify-between relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-20 right-20 animate-float">
              <Icon name="Sparkles" size={32} className="text-white/30" />
            </div>
            <div className="absolute bottom-32 left-12 animate-float" style={{ animationDelay: '1s' }}>
              <Icon name="Star" size={24} className="text-white/20" />
            </div>
            <div className="absolute top-1/2 right-12 animate-float" style={{ animationDelay: '2s' }}>
              <Icon name="Award" size={28} className="text-white/25" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-16">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Эвента</h2>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white leading-tight">
                  {activeTab === 'login' 
                    ? 'Ваше профессиональное пространство'
                    : 'Присоединяйтесь к сообществу профессионалов'
                  }
                </h1>
                <p className="text-white/90 text-lg">
                  {activeTab === 'login'
                    ? 'Управляйте профилем, отзывами и заказами в одном месте'
                    : 'Создайте профиль, получайте отзывы и развивайте карьеру в эвент-сфере'
                  }
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={24} className="text-white" />
                  <div>
                    <p className="text-white font-semibold">4 500+ артистов</p>
                    <p className="text-white/80 text-sm">уже управляют профилями на платформе</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Form Block */}
          <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
            <div className="w-full max-w-md animate-fade-in">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-base">
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Вход
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-base">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Регистрация
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN TAB */}
                <TabsContent value="login" className="space-y-6">
                  <div className="space-y-2 animate-fade-in">
                    <h2 className="text-3xl font-bold text-foreground">
                      {greeting.text}! {greeting.emoji}
                    </h2>
                    <p className="text-muted-foreground">
                      Войдите, чтобы продолжить управление профилем
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Email или телефон
                      </label>
                      <div className="relative">
                        <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="ivan@example.com"
                          className="pl-11 h-12 border-2"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>Пароль</span>
                        <button
                          type="button"
                          className="text-xs text-primary hover:underline"
                        >
                          Забыли пароль?
                        </button>
                      </label>
                      <div className="relative">
                        <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-11 pr-11 h-12 border-2"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base gradient-purple text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                          Открываем профиль...
                        </>
                      ) : (
                        <>
                          <Icon name="LogIn" size={18} className="mr-2" />
                          Войти в профиль
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">или</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full h-11" type="button">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Продолжить через Google
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Ещё нет профиля? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-primary font-semibold hover:underline"
                    >
                      Создать бесплатно
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Shield" size={14} />
                    <span>Защищено SSL-шифрованием</span>
                  </div>
                </TabsContent>

                {/* REGISTER TAB */}
                <TabsContent value="register" className="space-y-6">
                  <div className="space-y-2 animate-fade-in">
                    <h2 className="text-3xl font-bold text-foreground">
                      Создайте профиль 🚀
                    </h2>
                    <p className="text-muted-foreground">
                      Заполните данные для регистрации на платформе
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">
                      Я регистрируюсь как:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUserRole('artist')}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all',
                          userRole === 'artist'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <Icon 
                          name="Sparkles" 
                          size={24} 
                          className={cn(
                            'mx-auto mb-2',
                            userRole === 'artist' ? 'text-purple-500' : 'text-gray-400'
                          )} 
                        />
                        <p className={cn(
                          'font-semibold text-sm',
                          userRole === 'artist' ? 'text-purple-900' : 'text-gray-600'
                        )}>
                          Артист
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserRole('agency')}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all',
                          userRole === 'agency'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <Icon 
                          name="Building2" 
                          size={24} 
                          className={cn(
                            'mx-auto mb-2',
                            userRole === 'agency' ? 'text-purple-500' : 'text-gray-400'
                          )} 
                        />
                        <p className={cn(
                          'font-semibold text-sm',
                          userRole === 'agency' ? 'text-purple-900' : 'text-gray-600'
                        )}>
                          Агентство
                        </p>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        {userRole === 'artist' ? 'Ваше имя' : 'Название агентства'}
                      </label>
                      <div className="relative">
                        <Icon name="User" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder={userRole === 'artist' ? 'Анна Петрова' : 'Праздник+'}
                          className="pl-11 h-12 border-2"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Email
                      </label>
                      <div className="relative">
                        <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="ivan@example.com"
                          className="pl-11 h-12 border-2"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Телефон
                      </label>
                      <div className="relative">
                        <Icon name="Phone" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          className="pl-11 h-12 border-2"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Пароль
                      </label>
                      <div className="relative">
                        <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Минимум 8 символов"
                          className="pl-11 pr-11 h-12 border-2"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base gradient-purple text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                          Создаём профиль...
                        </>
                      ) : (
                        <>
                          <Icon name="Sparkles" size={18} className="mr-2" />
                          Создать профиль бесплатно
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center text-xs text-muted-foreground">
                    Нажимая "Создать профиль", вы соглашаетесь с{' '}
                    <button type="button" className="text-primary hover:underline">
                      Условиями использования
                    </button>
                  </div>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Уже есть профиль? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-primary font-semibold hover:underline"
                    >
                      Войти
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}