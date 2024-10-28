import { useState, useEffect } from 'react';
import React from 'react';
import { RxPerson } from 'react-icons/rx';
import { MdBarChart } from 'react-icons/md';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuGift } from 'react-icons/lu';
import { PiMedalThin } from 'react-icons/pi';
import { FiHelpCircle } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';
import { getNotifications } from '../../services/notificationService';

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
  const { logout } = useAuth();
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userId) {
          const data = await getNotifications(userId);
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const notificationCount = notifications.length;

  console.log('total: ', notificationCount);
  return (
    <div className="flex w-full flex-col p-5">
      {options.map((option, index) => (
        <a
          key={index}
          href={option.link || '#'}
          onClick={option.action === 'logout' ? logout : null}
          className={`relative flex h-14 w-full items-center justify-between bg-white px-5 text-[#181818] shadow-custom ${
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
          {option.name === 'Notificaciones' && notificationCount > 0 && (
            <span className="absolute right-0 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-lg text-white">
              {notificationCount}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
