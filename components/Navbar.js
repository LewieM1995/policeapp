

const Navbar = () => {
    return (
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "#fff" }}>
        <div>
          <h2>Police API Data search application</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <a href="http://localhost:3000" style={{ color: "#fff", textDecoration: "none" }}>
              Search with Lat/Lng
            </a>
          </div>
          <div style={{ marginRight: "20px" }}>
            <a href="http://localhost:3000/byforce" style={{ color: "#fff", textDecoration: "none" }}>
              Search By Force
            </a>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;