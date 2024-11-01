import { useState, useEffect } from 'react';
import { useMatch } from '../context/MatchContext';
import { getStanding } from '../services/matchService';
import TablePositions from '../components/organisms/TablePositions';
import LeagueEmblem from '../../assets/leagueEmblem.png';

export default function Positions() {
  const { selectedMatch } = useMatch();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStanding(selectedMatch.league.id);
        setStandings(data);
      } catch (err) {
        setError('Error al obtener las posiciones de la competencia');
      } finally {
        setLoading(false);
      }
    };

    if (selectedMatch?.league?.id) {
      fetchStandings();
    }
  }, [selectedMatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        {/* Liga y logo */}
        <img
          src={standings[0].league.leagueLogo || LeagueEmblem}
          alt={`Logo ${standings[0].league.leagueName}`}
          width={'32px'}
        />
        <h2 className="text-regularNav-16 font-medium text-label">
          {standings[0].league.leagueName}
        </h2>
      </div>
      <TablePositions
        standings={standings}
        localName={selectedMatch.localTeam.name}
        visitorName={selectedMatch.visitorTeam.name}
      />
    </section>
  );
}
