import { AuthProvider } from './app/context/AuthContext';
import { DateProvider } from './app/context/DateContext';
import { MatchProvider } from './app/context/MatchContext';
import AppRouter from './app/routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <MatchProvider>
          <AppRouter />
        </MatchProvider>
      </DateProvider>
    </AuthProvider>
  );
}
