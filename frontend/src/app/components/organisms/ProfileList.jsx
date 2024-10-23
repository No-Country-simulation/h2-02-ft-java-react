import React from 'react';
import { RxPerson } from 'react-icons/rx';
import { MdBarChart } from 'react-icons/md';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuGift } from 'react-icons/lu';
import { PiMedalThin } from 'react-icons/pi';
import { FiHelpCircle } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';

const iconSize = 20;

const options = [
  {
    name: 'Datos personales',
    icon: <RxPerson size={iconSize} />,
    link: '/profile/personal-data',
  },
  { name: 'Mis predicciones', icon: <MdBarChart size={iconSize} />, link: '' }, // Sin página creada
  { name: 'Mi ranking', icon: <FaArrowTrendUp size={iconSize} />, link: '' }, // Sin página creada
  { name: 'Rewards', icon: <LuGift size={iconSize} />, link: '' }, // Sin página creada
  { name: 'Mis quests', icon: <PiMedalThin size={iconSize} />, link: '' }, // Sin página creada
  {
    name: 'Notificaciones',
    icon: <IoIosNotificationsOutline size={iconSize} />,
    link: '/profile/notifications',
  },
  {
    name: 'Ayuda',
    icon: <FiHelpCircle size={iconSize} />,
    link: '/profile/help',
  },
  {
    name: 'Cerrar sesión',
    icon: <LuLogOut size={iconSize} />,
    action: 'logout',
  },
];

export default function ProfileList() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="flex w-full flex-col p-5">
      {options.map((option, index) => (
        <a
          key={index}
          href={option.link || '#'}
          onClick={option.action === 'logout' ? handleLogout : null}
          className={`flex h-14 w-full items-center justify-between bg-white px-5 text-[#181818] shadow-custom ${
            index === 0 ? 'rounded-t-lg' : ''
          } ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
        >
          <div className="grid grid-cols-[24px_1fr] items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              {option.icon}
            </div>
            <span className="text-regularNav-14 whitespace-nowrap">
              {option.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
