import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

function Navbar() {
  return (
    <nav className="nav-link-container">
      
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-link">
          <Link to="/blogs">Blogs</Link>
        </li>

      
    </nav>
  );
}

export default Navbar;
