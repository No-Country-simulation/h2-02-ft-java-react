import { createContext, useState, useContext, useEffect } from 'react';

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Verificar si hay un token en localStorage al montar la app
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Una vez hecho, dejamos de cargar
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Guarda el token en localStorage
    setIsAuthenticated(true); // Cambia el estado de autenticado a true
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acceder al contexto
export function useAuth() {
  return useContext(AuthContext);
}
