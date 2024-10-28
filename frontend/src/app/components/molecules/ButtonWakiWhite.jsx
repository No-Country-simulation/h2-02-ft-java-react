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
  let messageColor = 'text-[#555555]';
  let translatedText = text;

  if (isNotification) {
    if (text === 'Correct') {
      messageColor = 'text-green-700';
      translatedText = 'Correcto';
    } else if (text === 'Fail') {
      messageColor = 'text-red-700';
      translatedText = 'Fallido';
    }
  }

  return (
    <button
      className={`relative flex w-full ${isNotification ? 'flex-col' : 'items-center'} rounded-lg ${isNotification ? 'px-2 py-1' : 'p-5'} shadow-custom ${className}`}
    >
      <div className={`flex items-center ${iconColor}`}>
        <div className="mr-5 flex h-8 w-8 items-center justify-center">
          {icon}
        </div>
        {isNotification ? (
          <div className="flex flex-shrink flex-grow flex-col text-left">
            <span className="text-[12px] text-[#555555]">Predicciones</span>
            <span className="text-[16px] text-[#181818]">{translatedText}</span>
            <span className="overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-[12px] text-[#555555]">
              {result}
            </span>
            <span className={`text-[12px] ${messageColor}`}>{message}</span>
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
