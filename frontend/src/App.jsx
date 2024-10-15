import { AuthProvider } from './app/utils/AuthContext';
import AppRouter from './app/routes/AppRouter';
import AuthPage from './app/pages/AuthPage';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter>
        <AuthPage />
      </AppRouter>
    </AuthProvider>
  );
}
