import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
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
            to="/pages/logout"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link text-danger "
            }
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
