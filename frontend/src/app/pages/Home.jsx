import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          navigate('/match');
        } else {
          navigate('/auth');
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, navigate]);

  return (
    <main className="flex min-h-svh w-svw items-center justify-center bg-gradientWaki">
      <h1 className="animate-pulse text-black-44 font-black uppercase text-white">
        Waki
      </h1>
    </main>
  );
}
