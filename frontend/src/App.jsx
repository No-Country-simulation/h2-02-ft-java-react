import { AuthProvider } from './app/context/AuthContext';
import { DateProvider } from './app/context/DateContext';
import AppRouter from './app/routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <AppRouter />
      </DateProvider>
    </AuthProvider>
  );
}
