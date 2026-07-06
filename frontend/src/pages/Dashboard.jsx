import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_courses: 0,
    total_venues: 0,
    total_invigilators: 0,
    total_exams: 0,
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await api.get("/dashboard/");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Courses</h5>
              <h2>{stats.total_courses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Venues</h5>
              <h2>{stats.total_venues}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Invigilators</h5>
              <h2>{stats.total_invigilators}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Exams</h5>
              <h2>{stats.total_exams}</h2>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
