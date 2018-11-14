import React from 'react';
import axios from 'axios';
import '../styles/login.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleLogin() {
    axios.post('http://localhost:3000/api/v1/users', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    })
      .then(() => {
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <div>
        <h1 className="login-title">Sign Up</h1>
        <form className="login">
          <div>
            <label htmlFor="firstName">
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="lastName">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="email">
              Password:
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <button onClick={this.handleLogin}>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
