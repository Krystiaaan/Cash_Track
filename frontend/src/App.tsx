import {Route, Routes, } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { AuthProvider } from "./Auth/AuthProvider";
import { RegisterPage } from "./pages/registerPage/RegisterPage";
import { LoginPage } from "./pages/loginPage/loginPage";

export const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element= {<LoginPage/>} />
    </Routes>
    </AuthProvider>
  );
};