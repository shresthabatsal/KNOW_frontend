import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Author from "./pages/AuthorLogin";
import Footer from "./components/Footer/Footer";
import Search from "./pages/Search";
import AuthorHome from "./pages/AuthorHome";
import Create from "./pages/Create";
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/register", "/author", "/home", "/create"]; // Routes where Navbar should be hidden
  const hideFooterRoutes = ["/home", "/create"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author" element={<Author />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute role="author">
              <AuthorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute role="author">
              <Create />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Hide Footer on specific routes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;