import { IoSearchSharp } from 'react-icons/io5';
import IconButton from '../atoms/IconButton';

export default function Searchbar({ placeholder, name, value, onChange }) {
  return (
    <div className="relative px-5 py-6">
      <IconButton
        icon={IoSearchSharp}
        className="absolute left-8 top-1/2 -translate-y-1/2 transform text-[#999999]"
      />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="h-[38px] w-full rounded-large border border-inputBorder bg-inputBackground px-4 py-2 pl-10"
        placeholder={placeholder}
      />
    </div>
  );
}
