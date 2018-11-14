import React from 'react';
import '../styles/navbar.scss';
import { Link } from 'react-router-dom';

const styles = {
  activeLink: { fontWeight: 'bold' },
  padRight: { paddingRight: 20 },
};

const NavBar = ({ user, isLoggedIn, onLogout }) => (
  <div className="nav-container">
    <div className="logo"><i className="fas fa-home" /> Surreal Estate</div>
    <ul className="nav">
      <Link to="/" className="link">View Properties</Link>
      <Link to="/add-property" className="link">Add a Property</Link>
    </ul>
    {
      isLoggedIn && (
      <div style={{ display: 'inline-block', float: 'right' }}>
        <span style={styles.padRight}>{user.firstName} {user.lastName}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
      )}
  </div>
);

export default NavBar;
