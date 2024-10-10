import { useState } from 'react';
import { createUser } from '../../services/userService';
import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await createUser(username, email, password);
      console.log('Usuario creado:', response);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col justify-center bg-white p-8 sm:rounded-lg sm:shadow-lg"
    >
      <h2 className="mb-2 text-xl font-bold text-blue-600">
        Bienvenido a waki,
      </h2>
      <p className="mb-6 text-gray-500">Crea tu cuenta completando los datos</p>

      <div className="flex flex-col gap-3">
        <InputField
          label="Nombre de usuario"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
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
        <PasswordInput
          label="Repetir contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="my-6 h-[35px] bg-buttonPurple text-white"
      >
        Registrarse
      </Button>

      <div className="relative mb-4 flex items-center justify-center">
        <span className="text-black-400 relative z-10 bg-white px-2">
          o inicia sesión con
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black"></div>
        </div>
      </div>

      <GoogleLoginButton />
    </form>
  );
}
