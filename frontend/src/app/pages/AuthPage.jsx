import { useState } from 'react';
import AuthNavbar from '../components/atoms/AuthNavbar';
import LoginForm from '../components/organisms/LoginForm';
import RegisterForm from '../components/organisms/RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleTabClick = (tab) => {
    setIsLogin(tab === 'login');
  };

  return (
    <main className="flex w-full flex-col overflow-hidden bg-white sm:m-2 sm:w-[390px] sm:border sm:border-inputBorder">
      <AuthNavbar onTabClick={handleTabClick} isLogin={isLogin} />
      {isLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />
      )}
    </main>
  );
}
