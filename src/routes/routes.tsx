import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { useAuth } from "../contexts/authContext";
import { useAuthStore } from "../store/authStore";
import LoginPage from "../pages/LoginPage";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import HomePage from "../pages/HomePage";
import UserAdminPage from "../pages/UserAdminPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import AuctionRoomPage from "../pages/AuctionRoomPage";

const RoutesApp = () => {
  const { user } = useAuthStore((state) => state);
  const { isAdmin, isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LoginPage />
            ) : (
              <Navigate to={isAdmin ? "/admin/admin-panel" : "/home"} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuth ? (
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="auction" element={<AuctionRoomPage />} />
          <Route
            path="admin/user-management"
            element={isAdmin ? <UserAdminPage /> : <Navigate to="/home" />}
          />
          <Route
            path="admin/admin-panel"
            element={isAdmin ? <AdminPanelPage /> : <Navigate to="/home" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesApp;
