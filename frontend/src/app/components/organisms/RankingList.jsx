import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';

export default function RankingList({ rankingList }) {
  const navigate = useNavigate();

  const handleIconClick = (id) => {
    navigate(`/scout-players/player-details/${id}`);
  };

  const getDivisionImage = (division) => {
    switch (division) {
      case 'BRONCE':
        return DivisionBronce;
      case 'PLATA':
        return DivisionPlata;
      case 'ORO':
        return DivisionOro;
      default:
        return null;
    }
  };

  return (
    <section className="px-5">
      <div className="divide-y rounded-large shadow-custom">
        <div className="grid h-[34.91px] grid-cols-[1.5fr_4fr_1fr_1.5fr_1.5fr_0.5fr] items-center text-regular-12 text-grayLightWaki">
          <div className="text-center">#</div>
          <div className="text-left">Jugador</div>
          <div className="text-center">Div.</div>
          <div className="text-center">Released</div>
          <div className="text-center">Precio</div>
          <div></div>
        </div>
        {rankingList.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center p-4">
            <p className="text-center text-medium-18 text-label">
              No hay datos disponibles.
            </p>
          </div>
        ) : (
          rankingList.map((player, index) => (
            <div
              key={player.profileId}
              className="grid h-[59px] grid-cols-[1.5fr_4.5fr_1fr_1.5fr_1.5fr_0.5fr] items-center text-regular-12"
            >
              <div className="text-center text-[24px] text-blueWaki">
                {index + 1}
              </div>
              <div className="flex items-center truncate text-regular-15 text-label">
                {player.name}
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={getDivisionImage(player.division)}
                  alt={player.division}
                  className="h-6"
                />
              </div>
              <div className="text-center text-regular-14 text-grayLightWaki">
                {player.released}
              </div>
              <div className="text-center text-regular-14 text-label">
                {player.price}
              </div>
              <div className="flex justify-center">
                <RiArrowRightSLine
                  className="cursor-pointer text-blueWaki"
                  size={24}
                  onClick={() => handleIconClick(player.profileId)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
