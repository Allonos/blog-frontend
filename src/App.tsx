import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "@/src/pages/SignupPage";
import LoginPage from "@/src/pages/LoginPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
