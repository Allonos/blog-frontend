import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "@/src/pages/SignupPage";
import LoginPage from "@/src/pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
