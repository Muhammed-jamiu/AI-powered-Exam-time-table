import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar className="width-250" />

      <div
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
          background: "#f5f7fa",
        }}
      >
        <Navbar />

        <div
          style={{
            marginLeft: "250px",
            marginTop: "60px",
            padding: "20px",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
