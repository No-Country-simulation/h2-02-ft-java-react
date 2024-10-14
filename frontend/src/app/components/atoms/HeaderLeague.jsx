import LogoLaLiga from '../../../assets/laliga.png';

export default function HeaderLeague({ league }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      {/* Liga y logo */}
      <img src={LogoLaLiga} alt="Logo" width={'18px'} />
      <p className="text-regular-12 text-grayWaki">{league}</p>
    </div>
  );
}
