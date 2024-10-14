import MatchCard from '../molecules/MatchCard';

export default function MatchList() {
  const matchData = {
    localTeam: {
      name: 'Osasuna',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/CA_Osasuna_2024_crest.svg/1200px-CA_Osasuna_2024_crest.svg.png',
    },
    visitorTeam: {
      name: 'Barcelona',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/640px-FC_Barcelona_%28crest%29.svg.png',
    },
    score: '0-0',
    predictions: {
      localWin: '2.0',
      draw: '3.5',
      visitorWin: '1.8',
    },
    startTime: '2024-10-14T18:00:00Z',
  };

  return (
    <div>
      <MatchCard matchData={matchData} />
    </div>
  );
}
