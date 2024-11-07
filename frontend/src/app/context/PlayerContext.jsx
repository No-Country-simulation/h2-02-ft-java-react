import { createContext, useContext, useState, useEffect } from 'react';
import { getAllPlayersProfiles } from '../services/playerService';

const PlayerContext = createContext();

export const usePlayers = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const allPlayers = await getAllPlayersProfiles();
        setPlayers(allPlayers);
      } catch (error) {
        console.error(
          'Error al obtener todos los perfiles de jugadores:',
          error
        );
      }
    };

    fetchPlayers();
  }, []);

  const getAllPlayers = () => {
    return players;
  };

  const getGoldDivisionPlayers = () => {
    return players.filter((player) => player.division === 'ORO');
  };

  const getSilverDivisionPlayers = () => {
    return players.filter((player) => player.division === 'PLATA');
  };

  const getBronzeDivisionPlayers = () => {
    return players.filter((player) => player.division === 'BRONCE');
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        getAllPlayers,
        getGoldDivisionPlayers,
        getSilverDivisionPlayers,
        getBronzeDivisionPlayers,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
