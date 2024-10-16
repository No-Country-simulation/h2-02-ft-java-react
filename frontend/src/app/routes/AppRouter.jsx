import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Match from '../pages/Match';
import ScoutPlayers from '../pages/ScoutPlayers';
import Divisiones from '../pages/Divisiones';
import MyPredictions from '../pages/MyPredictions';
import PrivateRoute from '../routes/PrivateRoute';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas para Match y sus rutas anidadas */}
        <Route
          path="/match"
          element={
            <PrivateRoute>
              <Match />
            </PrivateRoute>
          }
        >
          <Route path="mypredictions" element={<MyPredictions />} />
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
