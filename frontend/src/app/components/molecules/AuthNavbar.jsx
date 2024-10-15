import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function AuthNavbar() {
  const location = useLocation();
  const navLocation = location.pathname === '/login' ? 'left' : 'right';
  const [underlinePosition, setUnderlinePosition] = useState(navLocation);

  // Función para manejar el cambio de posición del subrayado al hacer clic
  const handleTabClick = (tab) => {
    if (tab === 'login') {
      setUnderlinePosition('left');
    } else if (tab === 'register') {
      setUnderlinePosition('right');
    }
  };

  return (
    <div className="relative">
      <nav className="z-10 grid grid-cols-2 pt-10 text-center shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
        {/* Link para Iniciar Sesión */}
        <NavLink
          to="/login"
          onClick={() => handleTabClick('login')}
          className={({ isActive }) =>
            `px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
              isActive ? 'font-medium text-blueWaki' : 'text-grayWaki'
            }`
          }
        >
          Iniciar sesión
        </NavLink>

        {/* Link para Registrarse */}
        <NavLink
          to="/register"
          onClick={() => handleTabClick('register')}
          className={({ isActive }) =>
            `px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
              isActive ? 'font-medium text-blueWaki' : 'text-grayWaki'
            }`
          }
        >
          Registrarse
        </NavLink>
      </nav>

      {/* Borde deslizante */}
      <span
        className={`absolute bottom-0 h-[3px] w-1/2 transform bg-blueWaki transition-all duration-500 ease-in-out ${
          underlinePosition === 'left' ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></span>
    </div>
  );
}
