import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    department: "",
    level: "",
    semester: "",
    student_count: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async (e) => {
    e.preventDefault();

    try {
      await api.post("/courses/", formData);

      setFormData({
        course_code: "",
        course_title: "",
        department: "",
        level: "",
        semester: "",
        student_count: "",
      });

      fetchCourses();

      alert("Course added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async () => {
    try {
      await api.delete(`/courses/${selectedCourse.id}`);

      fetchCourses();

      setShowModal(false);

      setSelectedCourse(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.course_code.toLowerCase().includes(search.toLowerCase()) ||
      course.course_title.toLowerCase().includes(search.toLowerCase()) ||
      course.department.toLowerCase().includes(search.toLowerCase()),
  );
  {
    showModal && (
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Course</h5>

              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete this course?</p>

              <div className="alert alert-warning">
                <strong>{selectedCourse?.course_code}</strong>

                <br />

                {selectedCourse?.course_title}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                ❌ Cancel
              </button>

              <button className="btn btn-danger" onClick={deleteCourse}>
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <MainLayout>
      <h2 className="mb-4">Course Management</h2>

      <form onSubmit={addCourse} className="card p-4 mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Course Code"
              name="course_code"
              value={formData.course_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Course Title"
              name="course_title"
              value={formData.course_title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Student Count"
              name="student_count"
              value={formData.student_count}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="btn btn-primary">Add Course</button>
      </form>

      <div className="card">
        <div className="card-header">
          <input
            className="form-control"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Department</th>
                <th>Level</th>
                <th>Semester</th>
                <th>Students</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.course_code}</td>

                  <td>{course.course_title}</td>

                  <td>{course.department}</td>

                  <td>{course.level}</td>

                  <td>{course.semester}</td>

                  <td>{course.student_count}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowModal(true);
                      }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Course</h5>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <p>Are you sure you want to delete this course?</p>

                  <div className="alert alert-warning">
                    <strong>{selectedCourse?.course_code}</strong>

                    <br />

                    {selectedCourse?.course_title}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    ❌ Cancel
                  </button>

                  <button className="btn btn-danger" onClick={deleteCourse}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Courses;
