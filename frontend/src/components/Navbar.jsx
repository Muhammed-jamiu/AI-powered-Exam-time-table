import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Later we'll remove authentication token here

    navigate("/login");
  };

  return (
    <nav className="navbar bg-white shadow-sm px-4 d-flex justify-content-between">
      <h4 className="mb-0">AI Exam Timetable System</h4>

      <div
        className="position-relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <div
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
            gap: "10px",
          }}
        >
          <FaUserCircle size={30} color="#198754" />

          <div>
            <strong>Exam Officer</strong>

            <br />

            <small className="text-muted">Administrator</small>
          </div>
        </div>

        {showMenu && (
          <div
            className="card shadow position-absolute end-0 mt-2"
            style={{
              width: "180px",
              zIndex: 999,
            }}
          >
            <button className="btn btn-light text-start" onClick={handleLogout}>
              <FaSignOutAlt className="me-2 text-danger" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
