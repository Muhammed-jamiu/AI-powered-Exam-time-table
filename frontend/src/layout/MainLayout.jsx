import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#f5f7fa",
        }}
      >
        <Navbar />

        <main
          className="flex-grow-1"
          style={{
            marginTop: "60px",
            padding: "20px",
          }}
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
