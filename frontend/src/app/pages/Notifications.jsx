import { useState, useEffect } from 'react';
import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import ProfileNavbar from '../components/molecules/ProfileNavbar';
import { RiFootballLine } from 'react-icons/ri';
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
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <ButtonWakiWhite
              key={index}
              icon={<RiFootballLine size={iconSize} />}
              text={notification.tittle}
              result={notification.result}
              message={notification.message}
              iconColor={
                notification.seen ? iconColorInactive : iconColorActive
              }
              className="h-24"
              isNotification={true}
            />
          ))
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <p className="text-lg text-gray-500">
              No hay notificaciones disponibles
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
