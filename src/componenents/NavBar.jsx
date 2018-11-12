import React from 'react';
import '../styles/navbar.scss';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div className="nav-container">
    <div className="logo"><i className="fas fa-home" /> Surreal Estate</div>
    <ul className="nav">
      <Link to="/" className="link">View Properties</Link>
      <Link to="/add-property" className="link">Add a Property</Link>
    </ul>
  </div>
);

export default NavBar;
