import Link from "next/link";
import './styles.css';

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    background: "#3e363f",
    color: "#fff",
    marginBottom: '1rem',
  };


  return (
    <nav className="nav-styles" style={navStyle}>
      <div className='title-div'>
        <Link href='/'>
          <h2>
          Police API Data
          </h2>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul className="nav-ul">
          <li className="nav-li">
          <Link href="http://localhost:3000">
            Coordinates
          </Link>
          </li>
          <li className="nav-li">
          <Link href="http://localhost:3000/byforce">
           By Force
          </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;