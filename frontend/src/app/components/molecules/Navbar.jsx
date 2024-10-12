import { NavLink } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import { RiFootballLine } from 'react-icons/ri';
import { BsTrophy } from 'react-icons/bs';

export default function Navbar() {
  return (
    <nav className="grid h-[90px] w-full grid-cols-3 items-center justify-evenly rounded-t-large bg-blueWaki px-4 sm:min-w-[500px] xs:px-8">
      {/* Link para Scout Players */}
      <NavLink
        to="/scout-players"
        className={({ isActive }) =>
          `flex h-[53.67px] flex-col items-center justify-between ${
            isActive
              ? 'font-medium text-white'
              : 'text-[rgba(255,255,255,0.32)]'
          }`
        }
      >
        <FaDollarSign size={28} />
        <span className="mt-1 text-regular-12">Scout players</span>
      </NavLink>

      {/* Link para Partidos */}
      <NavLink
        to="/partidos"
        className={({ isActive }) =>
          `flex h-[53.67px] flex-col items-center justify-between ${
            isActive
              ? 'font-medium text-white'
              : 'text-[rgba(255,255,255,0.32)]'
          }`
        }
      >
        <RiFootballLine size={30} />
        <span className="mt-1 text-regular-12">Partidos</span>
      </NavLink>

      {/* Link para Divisiones */}
      <NavLink
        to="/divisiones"
        className={({ isActive }) =>
          `flex h-[53.67px] flex-col items-center justify-between ${
            isActive
              ? 'font-medium text-white'
              : 'text-[rgba(255,255,255,0.32)]'
          }`
        }
      >
        <BsTrophy size={28} />
        <span className="mt-1 text-regular-12">Divisiones</span>
      </NavLink>
    </nav>
  );
}
