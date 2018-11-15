import React from 'react';
import '../styles/navbar.scss';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const NavBar = props => {
  let showButton;
  let propertyButton;

  if (!props.userID) {
    showButton = (
      <FacebookLogin
        appId="260307918017346"
        fields="name,email,picture"
        callback={props.onLogin}
      />
    );
  } else {
    showButton = (
      <div className="login-button">
        <img className="fb-image" src={props.picture} />
        <span>{props.name}</span>
        <button className="sign-out" onClick={props.onLogout}>
        Sign Out
        </button>
      </div>
    );
    propertyButton = (
      <span>Add a Property</span>
    );
  }

  return (
    <div className="nav-container">
      <div className="logo"><i className="fas fa-home" /> Surreal Estate</div>
      <ul className="nav">
        <Link to="/" className="link">View Properties</Link>
        <Link to="/add-property" className="link">{propertyButton}</Link>
      </ul>
      <span style={{ display: 'inline-block', float: 'right' }}>{showButton}</span>
    </div>
  );
};

export default NavBar;
