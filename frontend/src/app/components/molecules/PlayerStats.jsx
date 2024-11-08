import { useEffect, useState } from 'react';
import { TbCards } from 'react-icons/tb';
import {
  getPlayerProfileWithStat,
  getPlayerProfileWithStatBySeason,
} from '../../services/playerService';

export default function PlayerStats({ playerStats, selectedYear }) {
  const [stats, setStats] = useState(playerStats ? playerStats : {});
  const playerId = playerStats?.playerId;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let updatedStats;
        if (selectedYear === 'Totales') {
          updatedStats = await getPlayerProfileWithStat(playerId);
        } else {
          updatedStats = await getPlayerProfileWithStatBySeason(
            playerId,
            selectedYear
          );
        }
        setStats(updatedStats);
      } catch (error) {
        console.error('Error al actualizar las estadísticas:', error);
      }
    };

    if (playerId) {
      fetchStats();
    }
  }, [selectedYear, playerId]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-evenly">
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center overflow-hidden rounded-large shadow-custom">
          <div className="text-regular-12 text-grayLightWaki">Goles</div>
          <div className="text-regular-16 font-medium text-label">
            {stats.totalGoals}
          </div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center overflow-hidden rounded-large shadow-custom">
          <div className="text-regular-12 text-grayLightWaki">Partidos</div>
          <div className="text-regular-16 font-medium text-label">
            {stats.totalAppearances}
          </div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center overflow-hidden rounded-large shadow-custom">
          <div className="text-regular-12 text-grayLightWaki">Minutos</div>
          <div className="text-regular-16 font-medium text-label">
            {stats.totalMinutes}
          </div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center overflow-hidden rounded-large shadow-custom">
          <div className="text-regular-12 text-grayLightWaki">Asistencias</div>
          <div className="text-regular-16 font-medium text-label">
            {stats.totalAssists}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col divide-y overflow-hidden rounded-large shadow-custom">
        <div className="flex items-center justify-between gap-2 px-4 py-2">
          <TbCards className="h-6 w-6 scale-x-[-1] transform text-[#FFDD00]" />
          <div className="flex-grow">
            <div className="text-regular-14 text-label">Tarjetas amarillas</div>
          </div>
          <div className="text-medium-18 text-label">
            {stats.totalYellowCards}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 px-4 py-2">
          <TbCards className="h-6 w-6 scale-x-[-1] transform text-redWaki" />
          <div className="flex-grow">
            <div className="text-regular-14 text-label">Tarjetas rojas</div>
          </div>
          <div className="text-medium-18 text-label">{stats.totalRedCards}</div>
        </div>
      </div>
    </div>
  );
}
