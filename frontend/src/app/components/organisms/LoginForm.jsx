import { useState, useEffect } from 'react';
import { loginUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../atoms/InputField';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import GoogleLoginButton from '../molecules/GoogleLoginButton';
import Modal from '../atoms/Modal';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [modalMessage, setModalMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (touched.email) validateEmail(formData.email);
    if (touched.password) validatePassword(formData.password);
  }, [formData.email, formData.password, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    if (name === 'email') validateEmail(formData.email);
    if (name === 'password') validatePassword(formData.password);
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
        password: 'Formato de contraseña invalido',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setModalMessage('Todos los campos son obligatorios');
      return;
    }

    if (errors.email || errors.password) {
      return;
    }

    try {
      const { token } = await loginUser(email, password);
      login({ token });
      navigate('/match');
    } catch (error) {
      setModalMessage('Error al iniciar sesión');
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

      <div className="relative flex flex-col gap-6">
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
      </div>

      <div className="mt-6 w-full text-center">
        <a href="#" className="text-regular-13 text-blueWaki underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button type="submit" className="mx-auto mt-6">
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

      {modalMessage && (
        <Modal onClose={() => setModalMessage('')}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </form>
  );
}
