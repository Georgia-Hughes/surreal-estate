import React from 'react';
import '../styles/app.scss';
import NavBar from '../componenents/NavBar';
import Properties from '../componenents/Properties';
import { Switch, Route } from 'react-router-dom';
import AddProperty from './AddProperty';
import AuthRoute from './AuthRoute';
import SignUp from './SignUp';
import Login from './Login';
import TokenManager from '../utils/token-manager';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  handleLogin() {
    this.setState({ user: TokenManager.getTokenPayload() });
  }

  handleLogout() {
    TokenManager.removeToken();
    this.setState({ user: null });
  }

  isLoggedIn() {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  }

  render() {
    return (
      <div>
        <NavBar
          isLoggedIn={this.isLoggedIn()}
          user={this.state.user}
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
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} onLogin={this.handleLogin} />
            )}
          />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
