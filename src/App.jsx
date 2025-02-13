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

const Page = ({ title }) => <h1 style={{ textAlign: "center" }}>{title}</h1>;

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
        <Route path="/home" element={<AuthorHome />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      {/* Hide Footer on specific routes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;