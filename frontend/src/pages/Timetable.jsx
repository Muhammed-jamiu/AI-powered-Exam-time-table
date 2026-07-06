import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";
import "../styles/Timetable.css";

function Timetable() {
  const [timetable, setTimetable] = useState([]);

  const hasTimetable = timetable.length > 0;

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await api.get("/timetable/");
      setTimetable(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateTimetable = async () => {
    try {
      await api.post("/timetable/generate");
      fetchTimetable();
      alert("Timetable generated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const clearTimetable = async () => {
    try {
      await api.delete("/timetable/clear");
      setTimetable([]);
      alert("Timetable cleared");
    } catch (error) {
      console.log(error);
    }
  };

  const printTimetable = () => {
    window.print();
  };

  return (
    <MainLayout>
      <h2 className="mb-4">Exam Timetable</h2>

      <div className="mb-4">
        <button
          className="btn btn-primary me-2 timetable-btn"
          onClick={generateTimetable}
          disabled={hasTimetable}
        >
          Generate Timetable
        </button>

        <button
          className="btn btn-danger me-2 timetable-btn"
          onClick={clearTimetable}
          disabled={!hasTimetable}
        >
          Clear Timetable
        </button>

        <button
          className="btn btn-success timetable-btn"
          onClick={printTimetable}
          disabled={!hasTimetable}
        >
          Print Timetable
        </button>
      </div>
      <div className="print-section">
        <h3 className="mb-3">AI Exam Timetable System</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Department</th>
              <th>Level</th>
              <th>Day</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Students</th>
              <th>Invigilator</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {timetable.map((item, index) => (
              <tr key={index}>
                <td>{item.course_code}</td>

                <td>{item.course_title}</td>

                <td>{item.department}</td>

                <td>{item.level}</td>

                <td>{item.exam_day}</td>

                <td>{item.exam_time}</td>

                <td>{item.venue}</td>

                <td>{item.allocated_students}</td>

                <td>{item.invigilator}</td>

                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Timetable;
