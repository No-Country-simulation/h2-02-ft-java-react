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
    </main>
  );
}
