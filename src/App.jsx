import "./App.css";
import { TrainingEditPage } from "@/Pages/TrainingEditPage/TrainingEditPage";
import { TrainingDetailPage } from "@/Pages/TrainingDetailPage/TrainingDetailPage";
import { TrainingCreatePage } from "@/Pages/TrainingCreatePage /TrainingCreatePage";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { MissingPage } from "@/Pages/MissingPage/MissingPage";
import { LoginPage } from "@/Pages/LoginPage/LoginPage";
import { RegisterPage } from "@/Pages/RegisterPage/RegisterPage";
import Dashboard from "@/Pages/Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import Role from "@/Utils/Role";
import Token from "@/Utils/Token";
import Test from "./Pages/Test";
import { Suspense } from "react";

const setToken = (userToken) => {
  sessionStorage.setItem("token", JSON.stringify(userToken));
};

const App = () => {
  const token = Token();
  const role = Role();

  const ProtectedRoute = ({
    tokenAvailable,
    redirectPath = "/login",
  }) => {
    const location = useLocation();
    tokenAvailable = !!JSON.parse(localStorage.getItem("token"));

    return tokenAvailable ? (
      <Outlet />
    ) : (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: location }}
      />
    );
  };

  const ProtectedLogin = ({ tokenAvailable, redirectPath = "/" }) => {
    const location = useLocation();
    tokenAvailable = !!JSON.parse(localStorage.getItem("token"));

    return tokenAvailable ? (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: location }}
      />
    ) : (
      <Outlet />
    );
  };

  const ProtectedAdmin = ({ roleAdmin, redirectPath = "/" }) => {
    const location = useLocation();
    roleAdmin = JSON.parse(localStorage.getItem("role"));

    return roleAdmin === "admin" ? (
      <Outlet />
    ) : (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: location }}
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute tokenAvailable={token} />}>
          <Route path="/(/|dashboard)/" element={<Dashboard />} />
          <Route
            path="/training/:id"
            element={<TrainingDetailPage />}
          />
          <Route
            path="/mytraining/:id"
            element={<TrainingDetailPage />}
          />
          <Route element={<ProtectedAdmin roleAdmin={role} />}>
            <Route
              path="/training/create"
              element={<TrainingCreatePage />}
            />
            <Route
              path="/mytraining/edit/:id"
              element={<TrainingEditPage />}
            />
          </Route>
        </Route>
        <Route path="*" exact={true} element={<MissingPage />} />
        <Route path="/missing" element={<MissingPage />} />
        <Route path="/test" element={<Test />} />
        <Route element={<ProtectedLogin tokenAvailable={token} />}>
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}
