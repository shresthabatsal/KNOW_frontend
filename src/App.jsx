import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import NewsPage from "./pages/NewsPage";
import Home from "./pages/Home";
import World from "./pages/World";
import Politics from "./pages/Politics";
import Business from "./pages/Business";
import Health from "./pages/Health";
import Sports from "./pages/Sports";
import Environment from "./pages/Environment";
import Travel from "./pages/Travel";
import Entertainment from "./pages/Entertainment";
import Science from "./pages/Science";
import Settings from "./pages/Settings";
import Author from "./pages/AuthorLogin";
import Footer from "./components/Footer/Footer";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import AuthorHome from "./pages/AuthorHome";
import Create from "./pages/Create";
import Articles from "./pages/Articles";
import Analytics from "./pages/Analytics";
import EditArticle from "./pages/EditArticle";
import AuthorSettings from "./pages/AuthorSettings";
import Terms from "./pages/Terms";
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isEditArticlePage = location.pathname.startsWith("/edit-article/");
  const hideNavbarRoutes = ["/signin", "/register", "/author", "/home", "/create", "/articles", "/edit-article", "/analytics", "/author-settings"]; // Routes where Navbar should be hidden
  const hideFooterRoutes = ["/home", "/create", "/articles", "/edit-article", "/analytics", "/author-settings"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && !isEditArticlePage && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author" element={<Author />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
        <Route path="/health" element={<Health />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/science" element={<Science />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/saved"
          element={
            <ProtectedRoute role="user">
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute role="user">
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:id"
          element={
            <ProtectedRoute role="author">
              <EditArticle />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/articles"
          element={
            <ProtectedRoute role="author">
              <Articles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="author">
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/author-settings"
          element={
            <ProtectedRoute role="author">
              <AuthorSettings />
            </ProtectedRoute>
          }
        />
        </Routes>
      {/* Hide Footer on specific routes */}
      {!hideFooterRoutes.includes(location.pathname) && !isEditArticlePage && <Footer />}
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