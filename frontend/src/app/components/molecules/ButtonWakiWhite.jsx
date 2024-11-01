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
  let messageColor = 'text-grayWaki';

  if (isNotification) {
    if (text === 'Correcta') {
      messageColor = 'text-greenWaki';
    } else if (text === 'Incorrecta') {
      messageColor = 'text-redWaki';
    }
  }

  return (
    <button
      className={`relative flex w-full ps-4 ${isNotification ? 'p-2' : 'items-center p-5'} rounded-large shadow-custom ${className}`}
    >
      <div className={`flex h-full w-full items-center gap-4 ${iconColor}`}>
        <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
        {isNotification ? (
          <div className="flex flex-shrink flex-grow flex-col overflow-hidden text-left text-regular-12">
            <span className="text-grayWaki">Predicciones</span>
            <span className="text-regularNav-16 text-label">{text}</span>
            <span className="overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-grayWaki">
              {result}
            </span>
            <span className={`${messageColor}`}>{message}</span>
          </div>
        ) : (
          <span className="text-regularNav-16 text-label">{text}</span>
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
