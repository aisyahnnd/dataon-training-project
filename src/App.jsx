import "./App.css";
import {
  TrainingCreatePage,
  TrainingDetailPage,
  TrainingEditPage,
  MissingPage,
  LoginPage,
  Dashboard,
} from "./Pages";
import Role from "@/Utils/Role";
import Token from "@/Utils/Token";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
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
