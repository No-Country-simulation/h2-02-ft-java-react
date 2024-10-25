import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthContext';
import { DateProvider } from './app/context/DateContext';
import { MatchProvider } from './app/context/MatchContext';
import { ModalProvider } from './app/context/ModalContext';
import { PredictionsProvider } from './app/context/PredictionsContext';
import AppRouter from './app/routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <MatchProvider>
          <PredictionsProvider>
            <ModalProvider>
              <Router>
                <AppRouter />
              </Router>
            </ModalProvider>
          </PredictionsProvider>
        </MatchProvider>
      </DateProvider>
    </AuthProvider>
  );
}
