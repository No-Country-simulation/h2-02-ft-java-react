import { useState } from 'react';
import { loginUser } from '../../services/userService';
import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Valida que todos los campos no estén vacíos
    if (!email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Valida que el email sea de gmail, hotmail o outlook
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!emailRegex.test(email)) {
      alert('El correo electrónico debe ser de gmail, hotmail o outlook');
      return;
    }

    // Valida que password no contenga espacios
    if (/\s/.test(password)) {
      alert('La contraseña no puede contener espacios');
      return;
    }

    try {
      const response = await loginUser(email, password);
      console.log('Usuario logueado:', response);
    } catch (error) {
      console.error('Error al loguear el usuario:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-center p-[37.5px]"
    >
      <h2 className="mb-1 text-semibold-22 font-semibold text-blueWaki">
        Hola de nuevo,
      </h2>
      <p className="mb-8 text-grayWaki">Por favor inicia sesión</p>

      <div className="flex flex-col gap-3">
        <InputField
          label="Ingresa tu email o teléfono"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          label="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4 w-full text-center">
        <a href="#" className="text-regular-13 text-blueWaki underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button className="mt-6 h-[35px] bg-purpleWaki text-white hover:bg-purpleWakiHover">
        Iniciar sesión
      </Button>

      <div className="relative my-8 flex items-center justify-center">
        <span className="relative z-10 bg-white px-2 text-grayWaki">
          O inicia sesión con
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-grayLineWaki"></div>
        </div>
      </div>

      <GoogleLoginButton />
    </form>
  );
}
