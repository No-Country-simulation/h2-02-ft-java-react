import { useState, useEffect } from 'react';
import { RxPerson } from 'react-icons/rx';
import { MdBarChart } from 'react-icons/md';
import { FiHelpCircle } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';
import { getNotifications } from '../../services/notificationService';
import { useDate } from '../../context/DateContext';

const iconSize = 20;

const options = [
  {
    name: 'Datos personales',
    icon: <RxPerson size={iconSize} />,
    link: '/profile/personal-data',
  },
  {
    name: 'Mis predicciones',
    icon: <MdBarChart size={iconSize} />,
    link: '/match/mypredictions',
    action: 'updateDate',
  },
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
  const { updateSelectedDate } = useDate();
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
                  : option.action === 'updateDate'
                    ? () => updateSelectedDate(new Date())
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
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
