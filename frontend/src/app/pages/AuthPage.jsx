import { useState } from 'react';
import AuthNavbar from '../components/atoms/AuthNavbar';
import Login from './Login';
import Register from './Register';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login'); // Estado para manejar la pestaña activa

  return (
    <>
      {/* AuthNavbar para cambiar entre Login y Registro */}
      <AuthNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mostrar el formulario según la pestaña seleccionada */}
      {activeTab === 'login' ? <Login /> : <Register />}
    </>
  );
}
