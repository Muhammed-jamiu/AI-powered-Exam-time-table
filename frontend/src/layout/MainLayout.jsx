import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
          background: "#f5f7fa",
        }}
      >
        <Navbar />

        <div className="container-fluid p-4">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
