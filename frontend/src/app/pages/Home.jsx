import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al usuario a /match después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/match');
    }, 2000);

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-svh w-svw items-center justify-center bg-gradientWaki">
      <h1 className="animate-pulse text-black-44 font-black uppercase text-white">
        Waki
      </h1>
    </main>
  );
}
