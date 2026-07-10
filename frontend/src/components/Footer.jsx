import { FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3" style={{ marginTop: "auto" }}>
      <div className="container">
        <div
          className="row"
          style={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <div className="col-md-6">
            <h4>AI Exam Timetable System</h4>

            <p className="text-light">
              An intelligent web-based examination timetable scheduling system
              developed to automate exam planning and improve scheduling
              efficiency.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Contact</h5>

            <p>
              <FaEnvelope className="me-2" />
              fpn@aiexam.com
            </p>

            <p>
              <FaPhone className="me-2" />
              +234-701-386-2792
            </p>

            <p>
              <FaGithub className="me-2" />
              AI Exam Timetable
            </p>
          </div>
        </div>

        <hr />

        <div className="text-center">
          © {new Date().getFullYear()} AI Exam Timetable System. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
