import ToggleSwitch from '../atoms/ToggleSwitch';

export default function ButtonWakiWhite({
  icon,
  text,
  iconColor,
  toggle,
  onToggle,
}) {
  return (
    <button className="flex h-14 w-full items-center rounded-lg pl-5 pr-3 shadow-custom">
      <div
        className={`mr-5 flex h-8 w-8 items-center justify-center ${iconColor}`}
      >
        {icon}
      </div>
      <span className="text-lg text-[#555555]">{text}</span>
      {toggle !== undefined && (
        <div className="ml-auto">
          <ToggleSwitch isChecked={toggle} onToggle={onToggle} />
        </div>
      )}
    </button>
  );
}
