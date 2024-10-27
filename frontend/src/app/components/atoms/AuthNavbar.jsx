import { useState, useEffect } from 'react';

export default function AuthNavbar({ onTabClick, isLogin }) {
  const [underlinePosition, setUnderlinePosition] = useState('left');

  useEffect(() => {
    setUnderlinePosition(isLogin ? 'left' : 'right');
  }, [isLogin]);

  const handleTabClick = (tab) => {
    setUnderlinePosition(tab === 'login' ? 'left' : 'right');
    onTabClick(tab);
  };

  return (
    <div className="relative">
      <nav className="grid grid-cols-2 pt-10 text-center shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
        <button
          onClick={() => handleTabClick('login')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'left'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => handleTabClick('register')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'right'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Registrarse
        </button>
      </nav>
      <span
        className={`absolute bottom-0 h-[3px] w-1/2 transform bg-blueWaki transition-all duration-500 ease-in-out ${
          underlinePosition === 'left' ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></span>
    </div>
  );
}
