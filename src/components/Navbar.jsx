import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navigate = useNavigate();

const goHome = () => {
  navigate("/");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Close menu 

const closeMenu = () => {
  const nav = document.getElementById("nav");
  if (nav.classList.contains("show")) {
    nav.classList.remove("show");
  }
};
  return (
<nav className="navbar navbar-expand-lg top-0 start-0 w-100">
  <div className="container">

    <Link className="navbar-brand fw-bold" to="/">
      <i>PrimeSelect</i>
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#nav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="nav">
      <ul className="navbar-nav ms-auto">

        <li className="nav-item fw-bold">
          <Link className="nav-link" to="/" onClick={() => {
            goHome();
            closeMenu();
          }}>
            Home
          </Link>
        </li>

        <li className="nav-item fw-bold">
          <Link className="nav-link" to="/admin" onClick={closeMenu}>
            {user ? "Admin Panel" : "Login as Admin"}
          </Link>
        </li>

        {user && (
          <li className="nav-item fw-bold">
            <button
              className="nav-link btn btn-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}

      </ul>
    </div>

  </div>
</nav>
  );
}

export default Navbar;