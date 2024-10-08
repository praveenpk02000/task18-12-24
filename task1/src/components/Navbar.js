import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">DB4CLOUD</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'nav-item active' : 'nav-item'}>About</Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'nav-item active' : 'nav-item'}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;