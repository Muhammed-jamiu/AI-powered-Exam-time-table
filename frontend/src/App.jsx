import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Venues from "./pages/Venues";
import Invigilators from "./pages/Invigilators";
import Timetable from "./pages/Timetable";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import History from "./pages/History";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/history" element={<History />} />
        <Route path="/pages/courses" element={<Courses />} />
        <Route path="/pages/venues" element={<Venues />} />
        <Route path="/pages/invigilators" element={<Invigilators />} />
        <Route path="/pages/timetable" element={<Timetable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
