import { BrowserRouter as Router } from 'react-router-dom';
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
            <Router>
              <AppRouter />
            </Router>
          </ModalProvider>
        </MatchProvider>
      </DateProvider>
    </AuthProvider>
  );
}
