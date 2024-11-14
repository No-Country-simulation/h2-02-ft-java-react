import { useState, useEffect } from 'react';
import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import { IoMdLock } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { getUserRankingList } from '../../services/divisionService';
import { useAuth } from '../../context/AuthContext';
import { getProfile } from '../../services/profileService';

export default function Ranking({ divisionData }) {
  const [rankingList, setRankingList] = useState([]);
  const [profile, setProfile] = useState({});
  const { division, points } = divisionData;
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserRankingList = async () => {
      try {
        const list = await getUserRankingList(userId);
        list.sort((a, b) => a.position - b.position);
        setRankingList(list);
      } catch (error) {
        console.error(
          'Error al obtener la lista de rankings de usuario:',
          error
        );
      }
    };

    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfile(userId);
        setProfile(profileData);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchUserRankingList();
    fetchUserProfile();
  }, [userId]);

  const divisions = {
    BRONZE: DivisionBronce,
    SILVER: DivisionPlata,
    GOLD: DivisionOro,
  };

  const divisionTitles = {
    BRONZE: 'División Bronce',
    SILVER: 'División Plata',
    GOLD: 'División Oro',
  };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="flex h-[132.52px] items-center justify-between p-4">
        {Object.keys(divisions).map((div, index) => (
          <div key={index} className="relative flex flex-col items-center p-4">
            {division !== div && (
              <IoMdLock
                className="absolute top-1/2 -translate-y-1/2 transform text-blueWaki"
                size={50}
              />
            )}
            <img
              src={divisions[div]}
              alt={`Division ${div}`}
              className="h-[81.88px]"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-medium-18 text-label">
        {divisionTitles[division]}
      </div>
      <div className="m-6 divide-y rounded-large shadow-custom">
        <div className="grid h-[34.91px] grid-cols-[1fr_3fr_2fr] items-center px-6 text-regular-12 text-grayLightWaki">
          <div className="text-left">#</div>
          <div className="text-left">Nombre de usuario</div>
          <div className="text-right">Puntos</div>
        </div>
        {division === 'LIMBO' ? (
          <div className="flex w-full flex-col items-center justify-center p-4">
            <p className="text-center text-medium-18 text-label">
              Debes ganar puntos para clasificarte.
            </p>
          </div>
        ) : (
          rankingList.map((user, index) => (
            <div
              key={index}
              className={`grid h-[59px] grid-cols-[1fr_3fr_2fr] items-center px-6 text-regular-12 ${
                user.username === profile.username ? 'bg-[#C2DAFF]' : ''
              }`}
            >
              <div className="text-left text-[24px] text-blueWaki">
                {user.position}
              </div>
              <div className="flex items-center text-left text-regularNav-16 text-label">
                <FaUserCircle color="#B1B1B1" size={42} className="mr-2" />
                {user.username === profile.username ? 'Tú' : user.username}
              </div>
              <div className="text-right text-regular-14 text-grayWaki">
                {user.points}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
