import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import HomePage from "../pages/home/HomePage";
import CreateExample from "../pages/CreateExample";
import Examples from "../pages/Examples";
import Auth from "../pages/Auth";
import RegisterUser from "../pages/RegisterUser";
import StorageService from "../utils/StorageService";
import { TOKEN_KEY } from "../utils/data";

export function isLoggedIn() {
  return StorageService.get(TOKEN_KEY) !== null;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={isLoggedIn()} redirectTo="/auth">
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/auth"
        element={
          <ProtectedRoute isAllowed={!isLoggedIn()} redirectTo="/">
            <Auth />
          </ProtectedRoute>
        }
      />

      <Route
        path="/auth/register"
        element={
          <ProtectedRoute isAllowed={!isLoggedIn()} redirectTo="/">
            <RegisterUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/examples"
        element={
          <ProtectedRoute isAllowed={isLoggedIn()} redirectTo="/auth">
            <Examples />
          </ProtectedRoute>
        }
      />

      <Route
        path="/examples/create"
        element={
          <ProtectedRoute isAllowed={isLoggedIn()} redirectTo="/auth">
            <CreateExample />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl font-bold text-black">Page Not Found</h1>
          </div>
        }
      />
    </>
  )
);

export default router;
