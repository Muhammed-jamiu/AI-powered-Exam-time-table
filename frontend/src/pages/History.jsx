import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  const [selectedHistory, setSelectedHistory] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showViewMenu, setShowViewMenu] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/history/");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistory = async () => {
    try {
      await api.delete(`/history/${selectedHistory.id}`);

      setShowDeleteModal(false);

      setSelectedHistory(null);

      loadHistory();
    } catch (error) {
      console.log(error);
    }
  };

  //download pdf file
  const downloadPdf = (id) => {
    window.open(`http://127.0.0.1:8000/history/${id}/pdf`, "_blank");
  };

  //download excel file
  const downloadExcel = (id) => {
    window.open(`http://127.0.0.1:8000/history/${id}/excel`, "_blank");
  };

  return (
    <MainLayout>
      <h2 className="mb-4">Timetable History</h2>

      {history.length === 0 ? (
        <div className="alert alert-info">No timetable history available.</div>
      ) : (
        history.map((item) => (
          <div className="card shadow-sm mb-3" key={item.id}>
            <div className="card-body">
              <h5 className="fw-bold">{item.department}</h5>

              <p className="mb-1">
                <strong>Semester:</strong> {item.semester}
              </p>

              <p className="mb-1">
                <strong>Session:</strong> {item.session}
              </p>

              <p className="mb-1">
                <strong>Total Exams:</strong> {item.total_exams}
              </p>

              <p className="text-muted">
                <strong>Generated:</strong>{" "}
                {new Date(item.generated_at).toLocaleString("en-NG", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>

              <div className="d-flex gap-2 position-relative">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    setShowViewMenu(showViewMenu === item.id ? null : item.id)
                  }
                >
                  <i className="bi bi-eye"></i> View
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setSelectedHistory(item);
                    setShowDeleteModal(true);
                  }}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>

                {showViewMenu === item.id && (
                  <div
                    className="card shadow position-absolute"
                    style={{
                      top: "45px",
                      left: "0",
                      width: "150px",
                      zIndex: 999,
                    }}
                  >
                    <div className="card-body p-2">
                      <button
                        className="btn btn-outline-danger btn-sm w-100 mb-2"
                        onClick={() => downloadPdf(item.id)}
                      >
                        <i className="bi bi-file-earmark-pdf"></i> PDF
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm w-100"
                        onClick={() => downloadExcel(item.id)}
                      >
                        <i className="bi bi-file-earmark-excel"></i> Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Delete Modal */}

      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,.5)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Delete Timetable</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this timetable?</p>

                <div className="alert alert-warning">
                  <strong>{selectedHistory?.department}</strong>

                  <br />

                  {selectedHistory?.session}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={deleteHistory}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default History;
