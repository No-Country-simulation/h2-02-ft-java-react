import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuGift, LuShieldClose, LuSparkle } from 'react-icons/lu';
import { PiMedalThin } from 'react-icons/pi';
import { useAuth } from '../../context/AuthContext';
import { getUserRanking } from '../../services/divisionService';
import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    LIMBO: '¡Gana puntos para clasificarte!',
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
        <div className="flex h-[250px] w-full flex-col items-center justify-center gap-3 rounded-large bg-white shadow-custom">
          <div className="flex w-full items-center justify-center space-x-4">
            {divisionData.division === 'LIMBO' ? (
              <LuShieldClose className="text-red-500" size={60} />
            ) : (
              <img
                src={divisionImages[divisionData.division]}
                alt={divisionTitles[divisionData.division]}
                className="h-[50px] w-auto"
              />
            )}
            <p className="text-[18px] text-label">
              {divisionTitles[divisionData.division]}
            </p>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <div className="text-regularNav-14 flex h-[60px] w-[130px] flex-col items-center justify-center rounded-lg bg-gradient-to-b from-purpleWaki to-blueWaki text-white">
              <p>{divisionData.points}</p>
              <p className="flex items-center gap-3 space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white text-white">
                  <LuSparkle size={16} />
                </span>
                Puntos
              </p>
            </div>
            <div className="text-regularNav-14 flex h-[60px] w-[120px] flex-col items-center justify-center rounded-lg bg-gradient-to-b from-purpleWaki to-blueWaki text-white">
              <p>{divisionData.position}</p>
              <p className="flex items-center gap-3 space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white text-white">
                  #
                </span>
                Posición
              </p>
            </div>
          </div>
          <div className="mt-2 flex w-full justify-evenly space-x-4">
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
                <PiMedalThin size={30} className="text-purpleWaki" />
              </div>
              <span className="mt-1 text-sm text-black">Quests</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
