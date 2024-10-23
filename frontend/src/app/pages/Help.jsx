import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import ProfileNavbar from '../components/molecules/ProfileNavbar';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FiHelpCircle } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Help() {
  const iconSize = 24;
  const iconColor = 'text-[#699BF7]';

  const buttons = [
    {
      icon: <IoMdPhonePortrait size={iconSize} />,
      text: '¿Cómo usar la app?',
      iconColor,
    },
    {
      icon: <FiHelpCircle size={iconSize} />,
      text: 'Preguntas frecuentes',
      iconColor,
    },
    { icon: <FaPhoneAlt size={iconSize} />, text: 'Contáctanos', iconColor },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden sm:min-w-[570px]">
      <ProfileNavbar beforePage={'Perfil'} titlePage={'Ayuda'} />
      <div className="flex flex-col items-center space-y-4 p-10">
        {buttons.map((button, index) => (
          <ButtonWakiWhite
            key={index}
            icon={button.icon}
            text={button.text}
            iconColor={button.iconColor}
          />
        ))}
      </div>
    </main>
  );
}
