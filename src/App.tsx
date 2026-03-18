import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "@/src/pages/SignupPage";
import LoginPage from "@/src/pages/LoginPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { useGetCheckAuthServiceQuery } from "./services/react-query/checkAuth/query/useGetCheckAuthServiceQuery";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import CreatePage from "./pages/CreatePage";

function App() {
  const { data: checkAuth, isLoading } = useGetCheckAuthServiceQuery();
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    setAuthUser(checkAuth ?? null);
  }, [checkAuth]);

  console.log(checkAuth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[18px] text-[#71717B]">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/"
          element={checkAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={checkAuth ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-post"
          element={checkAuth ? <CreatePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
