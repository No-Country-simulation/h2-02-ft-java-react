import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivateRoute from '../routes/PrivateRoute';
import PersonalData from '../pages/PersonalData';
import Notifications from '../pages/Notifications';
import Help from '../pages/Help';
import Setting from '../pages/Setting';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/match"
          element={
            <PrivateRoute>
              <Match />
            </PrivateRoute>
          }
        >
          <Route path="mypredictions" element={<MyPredictions />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route
          path="/scout-players"
          element={
            <PrivateRoute>
              <ScoutPlayers />
            </PrivateRoute>
          }
        />
        <Route
          path="/divisiones"
          element={
            <PrivateRoute>
              <Divisiones />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="personal-data" element={<PersonalData />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="help" element={<Help />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Ruta para la página de error 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
