import { useState } from 'react';
import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import PageNavbar from '../components/molecules/PageNavbar';
import { FiMoon } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsShieldLock } from 'react-icons/bs';
import { BsFileText } from 'react-icons/bs';

export default function Setting() {
  const iconSize = 32;
  const iconColor = 'text-[#999999]';

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const buttons = [
    {
      icon: <FiMoon size={iconSize} />,
      text: 'Modo oscuro',
      iconColor,
      toggle: darkMode,
      onToggle: () => setDarkMode(!darkMode),
    },
    {
      icon: <IoIosNotificationsOutline size={iconSize} />,
      text: 'Notificaciones',
      iconColor,
      toggle: notifications,
      onToggle: () => setNotifications(!notifications),
    },
    {
      icon: <BsShieldLock size={iconSize} />,
      text: 'Políticas de privacidad',
      iconColor,
    },
    {
      icon: <BsFileText size={iconSize} />,
      text: 'Términos y condiciones',
      iconColor,
    },
  ];

  return (
    <main className="mt-[80px] flex min-h-screen w-full flex-col overflow-hidden sm:max-w-[570px]">
      <PageNavbar beforePage={'Perfil'} titlePage={'Configuración'} />
      <div className="flex flex-col items-center space-y-4 px-5 py-10">
        {buttons.map((button, index) => (
          <ButtonWakiWhite
            key={index}
            icon={button.icon}
            text={button.text}
            iconColor={button.iconColor}
            toggle={button.toggle}
            onToggle={button.onToggle}
            className="h-14"
          />
        ))}
      </div>
    </main>
  );
}
