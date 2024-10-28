import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import { IoMdLock } from 'react-icons/io';

export default function Ranking({ divisionData }) {
  const { division, points } = divisionData;

  const divisions = {
    bronce: DivisionBronce,
    plata: DivisionPlata,
    oro: DivisionOro,
  };

  const divisionTitles = {
    bronce: 'División Bronce',
    plata: 'División Plata',
    oro: 'División Oro',
  };

  const users = [
    { position: 1, username: 'usuario1', points: 1500 },
    { position: 2, username: 'usuario2', points: 1450 },
    { position: 3, username: 'usuario3', points: 1400 },
    { position: 4, username: 'usuario4', points: 1350 },
    { position: 5, username: 'usuario5', points: 1300 },
    { position: 6, username: 'usuario6', points: 1250 },
    { position: 7, username: 'usuario7', points: 1200 },
    { position: 8, username: 'usuario8', points: 1150 },
    { position: 9, username: 'usuario9', points: 1100 },
    { position: 10, username: 'usuario10', points: 1050 },
  ];

  return (
    <main className="flex w-full flex-col overflow-hidden sm:min-w-[570px]">
      <div className="flex h-[132.52px] items-center justify-between p-4">
        {Object.keys(divisions).map((div, index) => (
          <div key={index} className="relative flex flex-col items-center p-4">
            {division !== div && (
              <IoMdLock
                className="absolute top-1/2 -translate-y-1/2 transform text-blueWaki"
                size={50}
              />
            )}
            <img
              src={divisions[div]}
              alt={`Division ${div}`}
              className="h-[81.88px]"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-[18px] text-[#181818]">
        {divisionTitles[division]}
      </div>
      <div className="rounded-2xl m-6 shadow-custom">
        <div className="grid h-[34.91px] grid-cols-[1fr_3fr_2fr] items-center border-b border-[#8D8D8D] px-6 text-[12px] text-[#8D8D8D]">
          <div className="text-left">#</div>
          <div className="text-left">Nombre de usuario</div>
          <div className="text-right">Puntos</div>
        </div>
        {users.map((user, index) => (
          <div
            key={index}
            className="grid h-[59px] grid-cols-[1fr_3fr_2fr] items-center border-b border-[#8D8D8D] px-6 text-[12px]"
          >
            <div className="text-left text-[24px] text-[#317EF4]">
              {user.position}
            </div>
            <div className="text-left text-[16px] text-[#181818]">
              {user.username}
            </div>
            <div className="text-right text-[14px] text-[#616161]">
              {user.points}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
