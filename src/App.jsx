import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Author from "./pages/AuthorLogin";
import Footer from "./components/Footer/Footer";
import Search from "./pages/Search";

const Page = ({ title }) => <h1 style={{ textAlign: "center" }}>{title}</h1>;

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/register", "/author"]; // Routes where Navbar should be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author" element={<Author />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
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