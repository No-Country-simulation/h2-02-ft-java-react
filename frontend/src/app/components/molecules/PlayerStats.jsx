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
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center rounded-lg shadow-custom">
          <div className="text-[12px] text-[#8D8D8D]">Goles</div>
          <div className="text-[16px] text-[#181818]">{stats.totalGoals}</div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center rounded-lg shadow-custom">
          <div className="text-[12px] text-[#8D8D8D]">Partidos</div>
          <div className="text-[16px] text-[#181818]">
            {stats.totalAppearances}
          </div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center rounded-lg shadow-custom">
          <div className="text-[12px] text-[#8D8D8D]">Minutos</div>
          <div className="text-[16px] text-[#181818]">{stats.totalMinutes}</div>
        </div>
        <div className="flex h-[70px] w-[82px] flex-col items-center justify-center rounded-lg shadow-custom">
          <div className="text-[12px] text-[#8D8D8D]">Asistencias</div>
          <div className="text-[16px] text-[#181818]">{stats.totalAssists}</div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-lg shadow-custom">
        <div className="flex items-center justify-between px-5 py-2">
          <TbCards className="mr-2 h-6 w-6 text-yellow-500" />
          <div className="flex-grow">
            <div className="text-[18px] text-[#181818]">Tarjetas amarillas</div>
          </div>
          <div className="text-[18px] text-[#181818]">
            {stats.totalYellowCards}
          </div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex items-center justify-between px-5 py-2">
          <TbCards className="mr-2 h-6 w-6 text-red-500" />
          <div className="flex-grow">
            <div className="text-[18px] text-[#181818]">Tarjetas rojas</div>
          </div>
          <div className="text-[18px] text-[#181818]">
            {stats.totalRedCards}
          </div>
        </div>
      </div>
    </div>
  );
}
