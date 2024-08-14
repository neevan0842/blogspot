import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AlertState from "./context/alert/AlertState";
import Alertx from "./components/Alert";
import NavBar from "./components/Navbar";
import AddPost from "./pages/AddPost";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <AlertState>
        <NavBar />
        <Alertx />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:postId" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AlertState>
    </BrowserRouter>
  );
}

export default App;
