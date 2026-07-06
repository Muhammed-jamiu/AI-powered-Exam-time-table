import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">AI Exam</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/pages/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/pages/courses">
            Courses
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/pages/venues">
            Venues
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/pages/invigilators">
            Invigilators
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/pages/timetable">
            Timetable
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link
            style={{
              color: "red",
              padding: "20px",
              marginTop: "100px",
            }}
            to="/logout"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
