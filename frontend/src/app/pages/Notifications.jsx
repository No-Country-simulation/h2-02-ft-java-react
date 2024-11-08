import { useState, useEffect } from 'react';
import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import PageNavbar from '../components/molecules/PageNavbar';
import { RiFootballLine } from 'react-icons/ri';
import { getNotifications } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';

export default function Notifications() {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const iconSize = 32;
  const iconColorInactive = 'text-grayWaki';
  const iconColorActive = 'text-blueWaki';

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
    <main className="mt-[80px] flex min-h-screen w-full flex-col overflow-hidden sm:max-w-[570px]">
      <PageNavbar beforePage={'Perfil'} titlePage={'Notificaciones'} />
      <div className="flex flex-col items-center space-y-4 px-5 py-10">
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
            <p className="text-lg text-grayLightWaki">
              No hay notificaciones disponibles
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
