import ToggleSwitch from '../atoms/ToggleSwitch';
import { IoIosNotificationsOutline } from 'react-icons/io';

export default function ButtonWakiWhite({
  icon,
  text,
  result,
  message,
  iconColor,
  toggle,
  onToggle,
  className,
  isNotification = false,
}) {
  return (
    <button
      className={`relative flex w-full ${isNotification ? 'flex-col' : 'items-center'} rounded-lg ${isNotification ? 'px-5 py-1' : 'p-5'} shadow-custom ${className}`}
    >
      <div className={`flex items-center ${iconColor}`}>
        <div className="mr-5 flex h-8 w-8 items-center justify-center">
          {icon}
        </div>
        {isNotification ? (
          <div className="flex flex-col text-left">
            <span className="text-[12px] text-[#555555]">Predicciones</span>
            <span className="text-[16px] text-[#181818]">{text}</span>
            <span className="text-[12px] text-[#555555]">{result}</span>
            <span className="text-[12px] text-[#555555]">{message}</span>
          </div>
        ) : (
          <span className="text-[16px] text-[#181818]">{text}</span>
        )}
      </div>
      {isNotification && (
        <div className="absolute right-2 top-2">
          <IoIosNotificationsOutline size={24} />
        </div>
      )}
      {!isNotification && toggle !== undefined && (
        <div className="ml-auto">
          <ToggleSwitch isChecked={toggle} onToggle={onToggle} />
        </div>
      )}
    </button>
  );
}
