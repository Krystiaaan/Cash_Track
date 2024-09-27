import {Route, Routes, } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { AuthProvider } from "./Auth/AuthProvider";
import { RegisterPage } from "./pages/registerPage/RegisterPage";


export const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </AuthProvider>
  );
};