import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Venues from "./pages/Venues";
import Invigilators from "./pages/Invigilators";
import Timetable from "./pages/Timetable";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pages/dashboard" element={<Dashboard />} />

        <Route path="/pages/courses" element={<Courses />} />

        <Route path="/pages/venues" element={<Venues />} />

        <Route path="/pages/invigilators" element={<Invigilators />} />

        <Route path="/pages/timetable" element={<Timetable />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
