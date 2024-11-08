import ButtonWakiWhite from '../components/molecules/ButtonWakiWhite';
import PageNavbar from '../components/molecules/PageNavbar';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FiHelpCircle } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Help() {
  const iconSize = 32;
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
    <main className="mt-[80px] flex min-h-screen w-full flex-col overflow-hidden sm:max-w-[570px]">
      <PageNavbar beforePage={'Perfil'} titlePage={'Ayuda'} />
      <div className="flex flex-col items-center space-y-4 px-5 py-10">
        {buttons.map((button, index) => (
          <ButtonWakiWhite
            key={index}
            icon={button.icon}
            text={button.text}
            iconColor={button.iconColor}
            className="h-14"
          />
        ))}
      </div>
    </main>
  );
}
