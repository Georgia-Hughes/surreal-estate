/* eslint-disable func-names */
import React from 'react';
import '../styles/app.scss';
import NavBar from '../componenents/NavBar';
import Properties from '../componenents/Properties';
import { Switch, Route } from 'react-router-dom';
import AddProperty from './AddProperty';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userID: null,
    };
  }

  handleLogin(response) {
    this.setState({
      userID: response.userID,
    });
  }

  handleLogout() {
    window.FB.logout();
  }

  render() {
    return (
      <div>
        <NavBar
          onLogin={this.handleLogin}
          onLogout={this.handleLogout}
          userID={this.state.userID}
        />
        <Switch>
          <Route exact path="/" component={Properties} />
          <Route exact path="/add-property" component={AddProperty} />
        </Switch>
      </div>
    );
  }
}

export default App;
