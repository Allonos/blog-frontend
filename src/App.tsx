import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import "./App.css";
import SignupPage from "@/src/pages/SignupPage";
import LoginPage from "@/src/pages/LoginPage";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { useGetCheckAuthServiceQuery } from "./services/react-query/checkAuth/query/useGetCheckAuthServiceQuery";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import CreatePage from "./pages/CreatePage";
import MessagesPage from "@/src/pages/MessagesPage";

function App() {
  const { data: checkAuth, isLoading } = useGetCheckAuthServiceQuery();
  const { setAuthUser } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setAuthUser(checkAuth ?? null);
  }, [checkAuth, setAuthUser]);

  useEffect(() => {
    if (searchParams.get("error") === "google_auth_failed") {
      toast.error("Google sign in failed. Please try again.");
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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
        <Route
          path="/messages"
          element={checkAuth ? <MessagesPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
