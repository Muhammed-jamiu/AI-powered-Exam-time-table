import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await api.get("/history/");
    setHistory(res.data);
  };

  return (
    <MainLayout>
      <h2 className="mb-4">Timetable History</h2>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Session</th>
                <th>Total Exams</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.generated_at}</td>

                  <td>{item.department}</td>

                  <td>{item.semester}</td>

                  <td>{item.session}</td>

                  <td>{item.total_exams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default History;
