import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; // Importamos el hook de autenticación

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Verificamos si el usuario está autenticado

  // Si no está autenticado, redirige a la página de inicio de sesión
  return isAuthenticated ? children : <Navigate to="/login" />;
}
