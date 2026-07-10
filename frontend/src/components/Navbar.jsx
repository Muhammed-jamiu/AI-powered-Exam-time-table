import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/home");
  };

  return (
    <nav
      className="navbar bg-white shadow-sm px-4 d-flex justify-content-between fixed-top"
      style={{ height: "60px", zIndex: 1000 }}
    >
      <h4 className="mb-0">AI Exam Timetable System</h4>

      <div
        className="position-relative"
        onMouseEnter={() => setShowMenu(true)}
        onClick={() => setShowMenu(false)}
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
            <button
              className="btn btn-light text-start"
              onClick={() => setShowLogoutModal(true)}
            >
              <FaSignOutAlt className="me-2 text-danger" />
              Logout
            </button>
          </div>
        )}
      </div>
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
