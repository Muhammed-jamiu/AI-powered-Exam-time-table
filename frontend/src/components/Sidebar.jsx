import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Sidebar.css";
import LogoutModal from "./LogoutModal";

function Sidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    navigate("/home");
  };
  return (
    <>
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          top: "60px",
          left: 0,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
      >
        <h4 className="mb-4">AI Exam</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to="/pages/dashboard"
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/pages/courses"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Courses
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/pages/venues"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Venues
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/pages/invigilators"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Invigilators
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/pages/timetable"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Timetable
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              to="/pages/history"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              History
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <button
              className="sidebar-link text-danger border-0 bg-transparent text-start w-100"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Sidebar;
