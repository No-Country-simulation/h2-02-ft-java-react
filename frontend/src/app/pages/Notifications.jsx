import { useState, useEffect } from 'react';
import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import ProfileNavbar from '../components/molecules/ProfileNavbar';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { getNotifications } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';

export default function Notifications() {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const iconSize = 24;
  const iconColorInactive = 'text-gray-400';
  const iconColorActive = 'text-blue-500';

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

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden sm:min-w-[570px]">
      <ProfileNavbar beforePage={'Perfil'} titlePage={'Notificaciones'} />
      <div className="flex flex-col items-center space-y-4 p-10">
        {notifications.map((notification, index) => (
          <ButtonWakiWhite
            key={index}
            icon={<IoIosNotificationsOutline size={iconSize} />}
            text={notification.tittle}
            iconColor={notification.seen ? iconColorInactive : iconColorActive}
            className="h-24"
          />
        ))}
      </div>
    </main>
  );
}
