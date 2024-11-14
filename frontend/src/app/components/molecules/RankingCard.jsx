import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuGift, LuShieldClose } from 'react-icons/lu';
import { PiMedal } from 'react-icons/pi';
import { useAuth } from '../../context/AuthContext';
import { getUserRanking } from '../../services/divisionService';
import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import PointsIcon from '../../../assets/points.svg';
import PositionIcon from '../../../assets/position.svg';

export default function RankingCard() {
  const { userId } = useAuth();
  const [divisionData, setDivisionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchUserRanking();
  }, [userId]);

  const divisionTitles = {
    BRONZE: 'División Bronce',
    SILVER: 'División Plata',
    GOLD: 'División Oro',
    LIMBO: '¡Ganá puntos para clasificarte!',
  };

  const divisionImages = {
    BRONZE: DivisionBronce,
    SILVER: DivisionPlata,
    GOLD: DivisionOro,
  };

  const handleNavigation = (view) => {
    navigate('/divisions', { state: { selectedView: view } });
  };

  return (
    <div className="relative -mt-16 px-5">
      {divisionData && (
        <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-4 rounded-large bg-white p-4 shadow-custom">
          <div className="flex w-full flex-col items-center justify-center">
            {divisionData.division === 'LIMBO' ? (
              <LuShieldClose className="text-redWaki" size={50} />
            ) : (
              <img
                src={divisionImages[divisionData.division]}
                alt={divisionTitles[divisionData.division]}
                className="h-[50px] w-auto"
              />
            )}
            <p
              className={`text-balance text-center text-label ${divisionData.division === 'LIMBO' ? 'text-regular-16' : 'text-medium-18'}`}
            >
              {divisionTitles[divisionData.division]}
            </p>
          </div>
          <div className="grid-cols-2fr-max grid w-full grid-rows-[60px] items-center justify-evenly gap-1 sm:justify-center sm:gap-3">
            <div className="bg-gradientWakiVertical flex h-full flex-col items-center justify-center gap-1 rounded-xl text-white">
              <p className="text-regular-16">{divisionData.points}</p>
              <p className="flex items-center gap-1">
                <img src={PointsIcon} alt="Points Icon" />
                Puntos
              </p>
            </div>
            <div className="bg-gradientWakiVertical flex h-full flex-col items-center justify-center gap-1 rounded-xl text-white">
              <p className="text-regular-16">{divisionData.position}</p>
              <p className="flex items-center gap-1">
                <img src={PositionIcon} alt="Position Icon" />
                Posición
              </p>
            </div>
          </div>
          <div className="grid-cols-3fr-max grid w-full justify-evenly gap-4 sm:justify-center sm:gap-8">
            <div className="flex flex-col items-center">
              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-purpleWaki shadow-custom"
                onClick={() => handleNavigation('ranking')}
              >
                <FaArrowTrendUp size={30} className="text-purpleWaki" />
              </div>
              <span className="mt-1 text-sm text-black">Ranking</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-purpleWaki shadow-custom"
                onClick={() => handleNavigation('rewards')}
              >
                <LuGift size={30} className="text-purpleWaki" />
              </div>
              <span className="mt-1 text-sm text-black">Rewards</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-purpleWaki shadow-custom"
                onClick={() => handleNavigation('quests')}
              >
                <PiMedal size={30} className="text-purpleWaki" />
              </div>
              <span className="mt-1 text-sm text-black">Quests</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
