import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import fpnImage from "../../assets/fpn_logo.png";

export default function Login() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
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

    try {
      const response = await login(formData);

      // Save JWT Token
      localStorage.setItem("access_token", response.access_token);

      alert("Login successful!");

      navigate("/pages/dashboard");
    } catch (error) {
      console.log(error.message);

      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <img
          src={fpnImage}
          alt="FPN Logo"
          width={160}
          height={160}
          className="d-block mx-auto mb-3"
        />
        <h2 className="text-center mb-4">Exam Officer Login</h2>
        <div className="text-center ">
          <p className="text-danger">{error}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
