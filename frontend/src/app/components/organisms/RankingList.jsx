import { RiArrowRightSLine } from 'react-icons/ri';
import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';

export default function RankingList({ rankingList }) {
  const handleIconClick = (id) => {
    console.log(`Player ID: ${id}`);
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
      <div className="rounded-2xl shadow-custom">
        <div className="grid h-[34.91px] grid-cols-[1fr_4fr_1fr_1.5fr_1.5fr_1fr] items-center border-b border-grayLightWaki pl-3 text-regular-12 text-grayLightWaki">
          <div className="text-left">#</div>
          <div className="text-left">Jugador</div>
          <div className="text-left">Div.</div>
          <div className="text-left">Released</div>
          <div className="text-right">Precio</div>
          <div></div>
        </div>
        {rankingList.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center p-4">
            <p className="text-center text-[18px] text-label">
              No hay datos disponibles.
            </p>
          </div>
        ) : (
          rankingList.map((player, index) => (
            <div
              key={player.profileId}
              className="grid h-[59px] grid-cols-[1fr_4fr_1fr_1.5fr_1.5fr_1fr] items-center border-b border-grayLightWaki pl-3 pr-1 text-regular-12"
            >
              <div className="text-left text-[24px] text-blueWaki">
                {index + 1}
              </div>
              <div className="flex items-center text-left text-regularNav-16 text-label">
                {player.name}
              </div>
              <div className="items-center text-left text-regular-14 text-grayWaki">
                <img
                  src={getDivisionImage(player.division)}
                  alt={player.division}
                  className="h-6"
                />
              </div>
              <div className="text-left text-regular-14 text-grayWaki">
                {player.released}
              </div>
              <div className="text-right text-regular-14 text-grayWaki">
                {player.price}
              </div>
              <div className="flex justify-end">
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
