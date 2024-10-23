export default function ToggleSwitch({ isChecked, onToggle }) {
  return (
    <div
      className={`relative h-[13.5px] w-6 cursor-pointer rounded-full ${isChecked ? 'bg-[#699BF7]' : 'bg-[#999999]'}`}
      onClick={onToggle}
    >
      <div
        className={`absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-[12px]' : 'translate-x-0'}`}
      ></div>
    </div>
  );
}
