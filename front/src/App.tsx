import { Routes, Route, useLocation } from "react-router-dom";
import GuestRecruitmentPage from "./pages/guest/GuestRecruitmentPage";
import GymRental from "./pages/rental/GymRental";
import HomePage from "./pages/HomePage";
import IntroducePage from "./pages/intro/IntroducePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";
import LoginPage from "./pages/login/LoginPage";
import Profile from "./pages/profile/Profile";
import Service from "./pages/service/Service";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    
    location.pathname === "/login" ? setHeaderDel(false) : setHeaderDel(true);
  }, [location.pathname]);
  const [headerDel, setHeaderDel] = useState(true);
  return (
    <>
      {headerDel ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroducePage />} />
        <Route path="/guest" element={<GuestRecruitmentPage />} />
        <Route path="/gym" element={<GymRental />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service" element={<Service />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
