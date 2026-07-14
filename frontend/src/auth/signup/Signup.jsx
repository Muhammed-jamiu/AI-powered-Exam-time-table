import { useState } from "react";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import fpnImage from "../../assets/fpn_logo.png";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    employee_id: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await signup(formData);

      alert("Account created successfully!");

      console.log(response);

      navigate("/auth/login");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid  d-flex justify-content-center align-items-center bg-light"
      style={{
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "500px", borderRadius: "12px" }}
      >
        <img
          src={fpnImage}
          alt="FPN Logo"
          width={160}
          height={160}
          className="d-block mx-auto mb-0"
        />
        <h2 className="text-center mb-4">Exam Officer Signup</h2>
        <div className="text-center text-danger">
          <p>{error}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className="form-control"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee ID</label>

            <input
              type="text"
              className="form-control"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="Enter your ID number(e.g, FPN/2001/CSC/001)"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              required
            />
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </div>
    </div>
  );
}
