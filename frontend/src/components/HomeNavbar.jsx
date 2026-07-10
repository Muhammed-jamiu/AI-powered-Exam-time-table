import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link className="navbar-brand fw-bold text-primary" to="/">
          🎓 AI Exam Timetable
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#hero">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul> */}

          <div className="d-flex gap-2">
            <Link to="/auth/login" className="btn btn-outline-primary">
              Login
            </Link>

            <Link to="/auth/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
