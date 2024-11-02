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
import { IoIosArrowDown } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import { getNotifications } from '../../services/notificationService';
import { getUserRanking } from '../../services/divisionService';

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
  const [activeRanking, setActiveRanking] = useState(false);
  const [divisionData, setDivisionData] = useState(null);

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

    const fetchUserRanking = async () => {
      try {
        if (userId) {
          const data = await getUserRanking(userId);
          setDivisionData(data);
        }
      } catch (error) {
        console.error('Error fetching user ranking:', error);
      }
    };

    fetchNotifications();
    fetchUserRanking();
  }, [userId]);

  const notificationCount = notifications.length;

  const toggleRanking = () => {
    setActiveRanking(!activeRanking);
  };

  const divisionTitles = {
    BRONZE: 'Bronce',
    SILVER: 'Plata',
    GOLD: 'Oro',
  };

  return (
    <section className="p-5">
      <div className="flex flex-col divide-y-2 overflow-hidden rounded-large shadow-custom">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <a
              href={option.link || '#'}
              onClick={
                option.action === 'logout'
                  ? logout
                  : option.name === 'Mi ranking'
                    ? toggleRanking
                    : null
              }
              className={`relative flex h-14 w-full items-center justify-between bg-white px-5 text-label ${
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
                <span className="regular-12 absolute right-5 flex h-6 w-6 items-center justify-center rounded-full bg-blueWaki font-medium text-white">
                  {notificationCount}
                </span>
              )}
              {option.name === 'Mi ranking' && (
                <IoIosArrowDown
                  className={`text-blueWaki transition-transform duration-300 ${
                    activeRanking ? 'rotate-180' : 'rotate-0'
                  }`}
                  size={18}
                />
              )}
            </a>
            {option.name === 'Mi ranking' && activeRanking && divisionData && (
              <div className="bg-white p-5 shadow-custom">
                {divisionData.division === 'LIMBO' ? (
                  <p className="text-center text-[18px] text-label">
                    Debes ganar puntos para clasificarte.
                  </p>
                ) : (
                  <div>
                    <p className="text-[18px] text-label">
                      División: {divisionTitles[divisionData.division]}
                    </p>
                    <p className="text-regularNav-16 text-grayWaki">
                      Posición: {divisionData.position}
                    </p>
                    <p className="text-regularNav-16 text-grayWaki">
                      Puntos: {divisionData.points}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
