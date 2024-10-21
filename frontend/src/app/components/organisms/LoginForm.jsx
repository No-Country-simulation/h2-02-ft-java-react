import { useState } from 'react';
import { loginUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validaciones
    if (!email || !password) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(
        'El correo electrónico debe ser de gmail, hotmail o outlook'
      );
      return;
    }

    if (/\s/.test(password)) {
      setErrorMessage('La contraseña no puede contener espacios');
      return;
    }

    try {
      const token = await loginUser(email, password); // Llama al servicio
      login(token); // Guarda el token en el contexto
      navigate('/match');
    } catch (error) {
      setErrorMessage(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-center px-4 py-[37.5px] xs:px-[37.5px]"
    >
      <h2 className="mb-1 text-semibold-22 font-semibold text-blueWaki">
        Hola de nuevo,
      </h2>
      <p className="mb-8 text-grayWaki">Por favor inicia sesión</p>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex flex-col gap-3">
        <InputField
          label="Ingresa tu email"
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

      {/* ¿Olvidaste tu contraseña? */}
      <div className="mt-4 w-full text-center">
        <a href="#" className="text-regular-13 text-blueWaki underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button className="mx-auto mt-6">Iniciar sesión</Button>

      {/* O inicia sesión con */}
      <div className="relative my-8 flex items-center justify-center">
        <span className="relative z-10 bg-white px-2 text-grayWaki">
          O inicia sesión con
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-grayLineWaki"></div>
        </div>
      </div>

      {/* Botón para Google */}
      <GoogleLoginButton />
    </form>
  );
}
