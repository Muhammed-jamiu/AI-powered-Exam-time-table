import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function Invigilators() {
  const [invigilators, setInvigilators] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedInvigilator, setSelectedInvigilator] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    staff_id: "",
    name: "",
    department: "",
    phone: "",
    status: "Available",
  });

  useEffect(() => {
    fetchInvigilators();
  }, []);

  const fetchInvigilators = async () => {
    try {
      const response = await api.get("/invigilators/");

      setInvigilators(response.data);
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

  const addInvigilator = async (e) => {
    e.preventDefault();

    try {
      await api.post("/invigilators/", formData);

      setErrorMessage("");

      setFormData({
        staff_id: "",
        name: "",
        department: "",
        phone: "",
        status: "Available",
      });

      fetchInvigilators();

      alert("Invigilator added successfully");
    } catch (error) {
      console.log(error);

      if (error.response) {
        setErrorMessage(
          error.response.data.detail ||
            error.response.data.message ||
            "Something went wrong.",
        );
      } else {
        setErrorMessage("Staff ID already exists.");
      }
    }
  };

  const deleteInvigilator = async () => {
    try {
      await api.delete(`/invigilators/${selectedInvigilator.id}`);

      fetchInvigilators();

      setShowModal(false);

      setSelectedInvigilator(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredInvigilators = invigilators.filter(
    (invigilator) =>
      (invigilator.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (invigilator.staff_id || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (invigilator.department || "")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <h2 className="mb-4">Invigilator Management</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={addInvigilator} className="card p-4 mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Staff ID"
              name="staff_id"
              value={formData.staff_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
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
              type="tel"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Available</option>
              <option>Unavailable</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add Invigilator
        </button>
      </form>

      <div className="card">
        <div className="card-header">
          <input
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvigilators.map((invigilator) => (
                <tr key={invigilator.id}>
                  <td>{invigilator.staff_id}</td>
                  <td>{invigilator.name}</td>
                  <td>{invigilator.department}</td>

                  <td>
                    <span
                      className={
                        invigilator.status === "Available"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }
                    >
                      {invigilator.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedInvigilator(invigilator);
                        setShowModal(true);
                      }}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Delete Invigilator</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this invigilator?</p>

                <div className="alert alert-warning">
                  <strong>{selectedInvigilator?.name}</strong>
                  <br />
                  {selectedInvigilator?.staff_id}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  <i className="bi bi-x-circle"></i> Cancel
                </button>

                <button className="btn btn-danger" onClick={deleteInvigilator}>
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Invigilators;
