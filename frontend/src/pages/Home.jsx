import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
      <HomeNavbar />

      <section
        id="hero"
        className="py-5"
        style={{
          background: "linear-gradient(to right,#f8f9fa,#ffffff)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT SIDE */}

            <div className="col-lg-6">
              <span className="badge bg-primary mb-3">
                AI Powered Scheduling
              </span>

              <h1 className="display-4 fw-bold" style={{ lineHeight: "1.3" }}>
                Generate Examination Timetables
                <span className="text-primary"> Automatically</span>
              </h1>

              <p className="lead text-muted mt-4">
                Simplify examination scheduling by automatically allocating
                courses, venues and invigilators while reducing scheduling
                conflicts and saving valuable time.
              </p>

              <div className="mt-4 d-flex gap-3">
                <a href="/auth/login" className="btn btn-primary btn-lg">
                  Get Started
                </a>

                <a href="#features" className="btn btn-outline-primary btn-lg">
                  Learn More
                </a>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-6 text-center">
              <div className="shadow-lg rounded-4 p-5 bg-white">
                <i
                  className="bi bi-calendar-check"
                  style={{
                    fontSize: "110px",
                    color: "#0d6efd",
                  }}
                ></i>

                <h3 className="mt-4">Smart Scheduling</h3>

                <p className="text-muted">
                  Intelligent allocation of courses, venues and invigilators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= STATISTICS ================= */}

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-journal-bookmark-fill text-primary fs-1"></i>
                  <h2 className="fw-bold mt-3">500+</h2>
                  <p className="text-muted mb-0">Courses Managed</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-building text-success fs-1"></i>
                  <h2 className="fw-bold mt-3">100+</h2>
                  <p className="text-muted mb-0">Available Venues</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-person-badge-fill text-warning fs-1"></i>
                  <h2 className="fw-bold mt-3">200+</h2>
                  <p className="text-muted mb-0">Invigilators</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-calendar-check-fill text-danger fs-1"></i>
                  <h2 className="fw-bold mt-3">1000+</h2>
                  <p className="text-muted mb-0">Exams Scheduled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
