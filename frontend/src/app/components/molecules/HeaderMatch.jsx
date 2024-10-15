import { IoCalendarClearOutline } from 'react-icons/io5';
import MatchNavbar from '../atoms/MatchNavbar';

export default function HeaderMatch({ updateList }) {
  return (
    <div className="relative shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
      <div className="relative flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <button className="absolute right-2 h-9 w-9 p-1">
          <IoCalendarClearOutline />
        </button>
        <span className="">Partidos</span>
      </div>
      <MatchNavbar updateList={updateList} />
    </div>
  );
}
