import { NavLink } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa6';
import { BsTrophy } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { GiSoccerBall } from 'react-icons/gi';

const navItems = [
  { to: '/scout-players', icon: <FaCoins size={28} />, label: 'Scout players' },
  { to: '/match', icon: <GiSoccerBall size={28} />, label: 'Partidos' },
  { to: '/divisions', icon: <BsTrophy size={28} />, label: 'Divisiones' },
  { to: '/profile', icon: <RxPerson size={28} />, label: 'Perfil' },
];

export default function Navbar() {
  return (
    <nav className="grid h-[90px] grid-cols-4 items-center justify-evenly rounded-t-large bg-blueWaki px-4 xs:px-8">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `flex h-[53.67px] flex-col items-center justify-between gap-1 transition-all duration-300 ease-in-out ${
              isActive
                ? 'text-white'
                : 'text-[rgba(255,255,255,0.32)] hover:text-white'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] sm:text-regular-16 xs:text-regular-12">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
