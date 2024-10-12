import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Partidos from '../pages/Partidos';
import ScoutPlayers from '../pages/ScoutPlayers';
import Divisiones from '../pages/Divisiones';
import PrivateRoute from '../routes/PrivateRoute';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Las pongo públicas para probar el navbar pero son privadas */}
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/scout-players" element={<ScoutPlayers />} />
        <Route path="/divisiones" element={<Divisiones />} />
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
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
