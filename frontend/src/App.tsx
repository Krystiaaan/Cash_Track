import {Route, Routes, } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";



export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};