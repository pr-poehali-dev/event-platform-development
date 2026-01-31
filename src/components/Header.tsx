import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

export default function Header() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');

  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Эвента
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/profiles')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Профили
              </button>
              <button 
                onClick={() => navigate('/agencies')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Для агентств
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О платформе
              </button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setAuthDefaultTab('login');
                  setShowAuthModal(true);
                }}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Button 
                className="gradient-purple text-white border-0" 
                onClick={() => {
                  setAuthDefaultTab('register');
                  setShowAuthModal(true);
                }}
              >
                <Icon name="Sparkles" size={16} className="mr-2" />
                Создать профиль
              </Button>
            </nav>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab={authDefaultTab}
      />
    </>
  );
}
