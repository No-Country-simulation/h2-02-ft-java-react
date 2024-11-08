import { useEffect, useState } from 'react';
import {
  getPlayerTrophies,
  getPlayerTrophiesBySeason,
} from '../../services/playerService';

export default function PlayerStats({ playerTrophies, selectedYear }) {
  const [trophies, setTrophies] = useState(
    playerTrophies ? playerTrophies : []
  );
  const playerId = playerTrophies?.[0]?.playerId;

  console.log('trofeos: ', playerId);

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        let updatedTrophies;
        if (selectedYear === 'Totales') {
          updatedTrophies = await getPlayerTrophies(playerId);
        } else {
          updatedTrophies = await getPlayerTrophiesBySeason(
            playerId,
            selectedYear
          );
        }
        setTrophies(updatedTrophies);
      } catch (error) {
        console.error('Error al actualizar los trofeos:', error);
      }
    };

    if (playerId) {
      fetchTrophies();
    }
  }, [selectedYear, playerId]);

  const isMessage = trophies.length === 1 && typeof trophies[0] === 'string';
  console.log('opcion: ', selectedYear);

  return (
    <div className="mb-5 flex w-full flex-col rounded-lg shadow-custom">
      {isMessage ? (
        <div className="flex items-center justify-center px-5 py-2">
          <div className="text-medium-18 text-label">{trophies[0]}</div>
        </div>
      ) : (
        trophies.map((trophy, index) => (
          <div key={trophy.id}>
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex-grow text-left">
                <div className="text-[14px] text-label">{trophy.league}</div>
              </div>
              <div className="text-right text-regular-12 text-grayLightWaki">
                {trophy.season}
              </div>
            </div>
            {index < trophies.length - 1 && (
              <hr className="border-t border-gray-300" />
            )}
          </div>
        ))
      )}
    </div>
  );
}
