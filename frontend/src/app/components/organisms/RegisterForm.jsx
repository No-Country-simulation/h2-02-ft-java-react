import { useState } from 'react';
import { createUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    if (username.startsWith(' ')) {
      setErrorMessage('El nombre de usuario no puede empezar con un espacio');
      return;
    }

    if (/\s/.test(password)) {
      setErrorMessage('La contraseña no puede contener espacios');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(
        'El correo electrónico debe ser de gmail, hotmail o outlook'
      );
      return;
    }

    try {
      const response = await createUser(username, email, password);
      console.log('Usuario creado:', response);
      navigate('/login'); // Redirige al login después del registro exitoso
    } catch (error) {
      setErrorMessage(error.message || 'Error al crear el usuario');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-center px-4 py-[37.5px] xs:px-[37.5px]"
    >
      <h2 className="mb-1 text-semibold-22 font-semibold text-blueWaki">
        Bienvenido a Waki,
      </h2>
      <p className="mb-8 text-grayWaki">Crea tu cuenta completando los datos</p>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex flex-col gap-3">
        <InputField
          label="Nombre de usuario"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
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
        <PasswordInput
          label="Repetir contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="mx-auto mt-8">
        Registrarse
      </Button>
    </form>
  );
}
