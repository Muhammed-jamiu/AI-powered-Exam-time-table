import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_courses: 0,
    total_venues: 0,
    total_invigilators: 0,
    total_exams: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/");

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainLayout>
        <h2 className="mb-4">Dashboard</h2>

        {/* Statistics */}

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted">Courses</h6>

                    <h2>{stats.total_courses}</h2>
                  </div>

                  <i
                    className="bi bi-book-fill text-primary"
                    style={{
                      fontSize: "2rem",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted">Venues</h6>

                    <h2>{stats.total_venues}</h2>
                  </div>

                  <i
                    className="bi bi-building text-success"
                    style={{
                      fontSize: "2rem",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted">Invigilators</h6>

                    <h2>{stats.total_invigilators}</h2>
                  </div>

                  <i
                    className="bi bi-people-fill text-warning"
                    style={{
                      fontSize: "2rem",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted">Exams</h6>

                    <h2>{stats.total_exams}</h2>
                  </div>

                  <i
                    className="bi bi-calendar-check-fill text-danger"
                    style={{
                      fontSize: "2rem",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5 className="mb-0">Quick Actions</h5>
          </div>

          <div className="card-body">
            <div className="d-flex gap-3 flex-wrap">
              <button
                className="btn btn-success"
                onClick={() => navigate("/pages/timetable")}
              >
                <i className="bi bi-plus-circle"></i> Generate Timetable
              </button>

              <button
                className="btn btn-danger"
                onClick={() => navigate("/pages/timetable")}
              >
                <i className="bi bi-trash"></i> Clear Timetable
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/pages/timetable")}
              >
                <i className="bi bi-printer"></i> Print Timetable
              </button>
            </div>
          </div>
        </div>

        {/* Exam Status */}

        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5 className="mb-0">Exam Status</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <h6>Timetable Status</h6>

                <span
                  className={
                    stats.total_exams > 0
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
                >
                  {stats.total_exams > 0 ? "Generated" : "Not Generated"}
                </span>
              </div>

              <div className="col-md-4">
                <h6>Scheduled Exams</h6>

                <h4>{stats.total_exams}</h4>
              </div>

              <div className="col-md-4">
                <h6>Department</h6>

                <h4>Computer Science</h4>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}

        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">System Information</h5>
          </div>

          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <th>Department</th>
                  <td>Computer Science</td>
                </tr>

                <tr>
                  <th>Session</th>
                  <td>2025/2026</td>
                </tr>

                <tr>
                  <th>Semester</th>
                  <td>First Semester</td>
                </tr>

                <tr>
                  <th>Exam Week</th>
                  <td>Monday-Friday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard;
