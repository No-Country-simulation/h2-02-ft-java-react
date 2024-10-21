import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Mientras el estado de carga está activo, mostramos un spinner o simplemente evitamos el renderizado
    return <div>Cargando...</div>; // O un componente de carga
  }

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo
  return children;
}
