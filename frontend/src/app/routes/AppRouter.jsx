import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Match from '../pages/Match';
import ScoutPlayers from '../pages/ScoutPlayers';
import Divisiones from '../pages/Divisiones';
import MyPredictions from '../pages/MyPredictions';
import Details from '../pages/Details';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import PersonalData from '../pages/PersonalData';
import Notifications from '../pages/Notifications';
import Help from '../pages/Help';
import Setting from '../pages/Setting';

export default function AppRouter() {
  const location = useLocation(); // Detectamos el cambio de ruta

  return (
    <AnimatePresence mode="wait">
      {' '}
      {/* Usamos mode="wait" para gestionar las transiciones */}
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/match"
          element={
            <PrivateRoute>
              <PageWrapper>
                <Match />
              </PageWrapper>
            </PrivateRoute>
          }
        >
          <Route
            path="mypredictions"
            element={
              <PageWrapper>
                <MyPredictions />
              </PageWrapper>
            }
          />
          <Route
            path="details"
            element={
              <PageWrapper>
                <Details />
              </PageWrapper>
            }
          />
        </Route>
        <Route
          path="/scout-players"
          element={
            <PrivateRoute>
              <PageWrapper>
                <ScoutPlayers />
              </PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/divisiones"
          element={
            <PrivateRoute>
              <PageWrapper>
                <Divisiones />
              </PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageWrapper>
                <Profile />
              </PageWrapper>
            </PrivateRoute>
          }
        >
          <Route
            path="personal-data"
            element={
              <PageWrapper>
                <PersonalData />
              </PageWrapper>
            }
          />
          <Route
            path="notifications"
            element={
              <PageWrapper>
                <Notifications />
              </PageWrapper>
            }
          />
          <Route
            path="help"
            element={
              <PageWrapper>
                <Help />
              </PageWrapper>
            }
          />
          <Route
            path="setting"
            element={
              <PageWrapper>
                <Setting />
              </PageWrapper>
            }
          />
        </Route>

        {/* Ruta para la página de error 404 */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// Componente PageWrapper para animar cada vista
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // La vista aparece con opacidad 0 y desplazada hacia abajo
      animate={{ opacity: 1, y: 0 }} // Transición suave al mostrar la vista
      exit={{ opacity: 0, y: -10 }} // La vista desaparece con un desvanecimiento y desplazamiento hacia arriba
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      {children}
    </motion.div>
  );
}
