import React from 'react';
import '../styles/app.scss';
import NavBar from '../componenents/NavBar';
import Properties from '../componenents/Properties';
import { Switch, Route } from 'react-router-dom';
import AddProperty from './AddProperty';
import AuthRoute from './AuthRoute';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userID: null,
      picture: null,
      name: null,
    };
  }

  handleLogin = response => {
    this.setState({
      userID: response.userID,
      picture: response.picture.data.url,
      name: response.name,
    });
  };

  handleLogout = () => {
    this.setState({
      userID: null,
      picture: null,
      name: null,
    });
  };

  isLoggedIn = () => {
    return Boolean(this.state.userID);
  };

  render() {
    return (
      <div>
        <NavBar
          onLogin={this.handleLogin}
          userID={this.state.userID}
          picture={this.state.picture}
          name={this.state.name}
          onLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={Properties}
          />
          <AuthRoute
            exact
            path="/add-property"
            component={AddProperty}
            authenticate={this.isLoggedIn}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
