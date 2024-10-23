import { AuthProvider } from './app/context/AuthContext';
import { DateProvider } from './app/context/DateContext';
import { MatchProvider } from './app/context/MatchContext';
import { ModalProvider } from './app/context/ModalContext';
import AppRouter from './app/routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <MatchProvider>
          <ModalProvider>
            <AppRouter />
          </ModalProvider>
        </MatchProvider>
      </DateProvider>
    </AuthProvider>
  );
}
