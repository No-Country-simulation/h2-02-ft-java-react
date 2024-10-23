import { NavLink } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import { RiFootballLine } from 'react-icons/ri';
import { BsTrophy } from 'react-icons/bs';
import { RxPerson } from "react-icons/rx";

const navItems = [
  {
    to: '/scout-players',
    icon: <FaDollarSign size={28} />,
    label: 'Scout players',
  },
  { to: '/match', icon: <RiFootballLine size={28} />, label: 'Partidos' },
  { to: '/divisiones', icon: <BsTrophy size={28} />, label: 'Divisiones' },
  { to: '/profile', icon: <RxPerson size={28} />, label: 'Perfil' },
];

export default function Navbar() {
  return (
    <nav className="grid h-[90px] w-full grid-cols-4 items-center justify-evenly rounded-t-large bg-blueWaki px-4 xs:px-8 sm:min-w-[500px]">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `flex h-[53.67px] flex-col items-center justify-between transition-all duration-300 ease-in-out ${
              isActive
                ? 'font-medium text-white'
                : 'text-[rgba(255,255,255,0.32)] hover:text-white'
            }`
          }
        >
          {item.icon}
          <span className="mt-1 text-regular-12">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
