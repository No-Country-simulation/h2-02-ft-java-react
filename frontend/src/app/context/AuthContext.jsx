import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  console.log(userId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.User_id);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = ({ token }) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.User_id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
