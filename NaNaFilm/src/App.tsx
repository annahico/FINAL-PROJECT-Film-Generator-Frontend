import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error from "./component/common/Error";
import MovieDetailCard from "./component/common/MovieDetailsCard";
import Navbar from "./component/common/Navbar";
import OpenRoute from "./component/common/routes/OpenRoute";
import PrivateRoute from "./component/common/routes/PrivateRoute";
import ShowMovies from "./pages/Landing/ShowMovies";
import FavMovies from "./pages/user/FavMovies";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<ShowMovies />} />

        {/* Rutas protegidas para usuarios no autenticados */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route
          path="/favmovie"
          element={
            <PrivateRoute>
              <FavMovies />
            </PrivateRoute>
          }
        />

        {/* Ruta para detalles de la película */}
        <Route path="/movie-details/:_id" element={<MovieDetailCard />} />

        {/* Ruta para manejar errores */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
