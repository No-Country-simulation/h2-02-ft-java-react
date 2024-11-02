import { useState, useEffect } from 'react';
import { createUser } from '../../services/userService';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import PasswordInput from '../molecules/PasswordInput';
import Modal from '../atoms/Modal';

export default function RegisterForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (touched.username) validateUsername(formData.username);
    if (touched.email) validateEmail(formData.email);
    if (touched.password) validatePassword(formData.password);
    if (touched.confirmPassword)
      validateConfirmPassword(formData.confirmPassword);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    if (name === 'username') validateUsername(formData.username);
    if (name === 'email') validateEmail(formData.email);
    if (name === 'password') validatePassword(formData.password);
    if (name === 'confirmPassword')
      validateConfirmPassword(formData.confirmPassword);
  };

  const validateUsername = (username) => {
    if (!username) {
      setErrors((prev) => ({
        ...prev,
        username: 'El nombre de usuario no puede estar vacío',
      }));
    } else if (username.length <= 2) {
      setErrors((prev) => ({
        ...prev,
        username: 'Formato de nombre de usuario incorrecto',
      }));
    } else if (/^\s/.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: 'Formato de nombre de usuario incorrecto',
      }));
    } else {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: 'El correo no puede estar vacío',
      }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Formato de correo inválido' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: 'La contraseña no puede estar vacía',
      }));
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Formato de contraseña inválido',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          'La confirmación de la contraseña no puede estar vacía',
      }));
    } else if (confirmPassword !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setModalMessage('Todos los campos son obligatorios');
      return;
    }

    if (
      errors.username ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    try {
      const response = await createUser(username, email, password);
      console.log('Usuario creado:', response);
      onRegisterSuccess();
    } catch (error) {
      setModalMessage('Error al crear el usuario');
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

      <div className="relative flex flex-col gap-6">
        <div className="relative">
          <InputField
            label="Nombre de usuario"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative"
          />
          {touched.username && errors.username && (
            <p className="absolute mt-1 text-xs text-redWaki">
              {errors.username}
            </p>
          )}
        </div>
        <div className="relative">
          <InputField
            label="Ingresa tu email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative"
          />
          {touched.email && errors.email && (
            <p className="absolute mt-1 text-xs text-redWaki">{errors.email}</p>
          )}
        </div>
        <div className="relative">
          <PasswordInput
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative"
          />
          {touched.password && errors.password && (
            <p className="absolute mt-1 text-xs text-redWaki">
              {errors.password}
            </p>
          )}
        </div>
        <div className="relative">
          <PasswordInput
            label="Repetir contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="absolute mt-1 text-xs text-redWaki">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="mx-auto mt-8">
        Registrarse
      </Button>

      {modalMessage && (
        <Modal onClose={() => setModalMessage('')}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </form>
  );
}
