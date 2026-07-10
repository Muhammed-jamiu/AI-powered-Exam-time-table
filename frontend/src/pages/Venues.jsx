import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function Venues() {
  const [venues, setVenues] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    building: "",
    status: "Available",
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await api.get("/venues/");

      setVenues(response.data);
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

  const addVenue = async (e) => {
    e.preventDefault();

    try {
      await api.post("/venues/", formData);

      setFormData({
        name: "",
        capacity: "",
        building: "",
        status: "Available",
      });

      fetchVenues();

      alert("Venue added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVenue = async () => {
    try {
      await api.delete(`/venues/${selectedVenue.id}`);

      fetchVenues();

      setShowModal(false);

      setSelectedVenue(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <h2 className="mb-4">Venue Management</h2>

      {/* ADD VENUE */}

      <form onSubmit={addVenue} className="card p-4 mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Venue Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Building"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add Venue
        </button>
      </form>

      {/* TABLE */}

      <div className="card">
        <div className="card-header">
          <input
            className="form-control"
            placeholder="Search venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredVenues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.name}</td>

                  <td>{venue.capacity}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedVenue(venue);

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

      {/* DELETE MODAL */}

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
                <h5 className="modal-title">Delete Venue</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this venue?</p>

                <div className="alert alert-warning">
                  <strong>{selectedVenue?.name}</strong>
                  <br />
                  Capacity: {selectedVenue?.capacity}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  <i className="bi bi-x-circle"></i> Cancel
                </button>

                <button className="btn btn-danger" onClick={deleteVenue}>
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

export default Venues;
