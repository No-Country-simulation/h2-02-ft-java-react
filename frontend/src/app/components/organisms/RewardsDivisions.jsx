import { TbRosetteNumber1 } from 'react-icons/tb';
import { IoGift } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const iconSize = '48px';

const optionsGold = [
  {
    icon: <TbRosetteNumber1 size={iconSize} className="text-blueWaki" />,
    text: 'El usuario en el primer puesto de esta división ganará el premio del mes.',
  },
  {
    icon: <IoGift size={iconSize} className="text-[#CFA53C]" />,
    text: 'Participar en el sorteo mensual por el premio de la division Oro.',
  },
  {
    icon: <IoGift size={iconSize} className="text-[#A4A4A4]" />,
    text: 'Participar en el sorteo mensual por el premio de la division Plata.',
  },
  {
    icon: <RiMoneyDollarCircleLine size={iconSize} className="text-blueWaki" />,
    text: 'Acceso a los tokens de los jugadores de la división Oro y Plata.',
  },
];

const optionsSilver = [
  {
    icon: <IoGift size={iconSize} className="text-[#A4A4A4]" />,
    text: 'Participar en el sorteo mensual por el premio de la division Plata.',
  },
  {
    icon: <RiMoneyDollarCircleLine size={iconSize} className="text-blueWaki" />,
    text: 'Acceso a los tokens de los jugadores de la división Oro y Plata.',
  },
];

export default function RewardsDivisions({ isGold }) {
  const options = isGold ? optionsGold : optionsSilver;

  return (
    <div className="m-7 rounded-lg shadow-custom">
      {options.map((option, index) => (
        <div key={index}>
          <div className="flex h-[80px] items-center p-5 text-regular-12 text-label">
            {option.icon}
            <span className="ml-2">{option.text}</span>
          </div>
          {index < options.length - 1 && (
            <hr className="border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
