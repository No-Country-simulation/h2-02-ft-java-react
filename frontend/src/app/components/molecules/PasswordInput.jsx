import { useState } from 'react';
import InputField from '../atoms/InputField';
import IconButton from '../atoms/IconButton';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

export default function PasswordInput({ label, name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    event.stopPropagation(); // Evita la propagación del clic
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <InputField
        type={showPassword ? 'text' : 'password'}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
      <IconButton
        icon={showPassword ? IoEyeOffOutline : IoEyeOutline}
        className="absolute bottom-2 right-4 text-[#999999]"
        onClick={togglePasswordVisibility}
      />
    </div>
  );
}
