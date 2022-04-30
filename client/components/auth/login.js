import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

let isAuthenticated = false;
class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null,
    errors: {}
  };


  login = ( {email, password} ) => {

    //Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({ email, password});

    axios.post('http://localhost:3000/bookbee/users/login', body, config)
        .then(res =>{ 
          localStorage.setItem('token', res.data.token);
          console.log(res.data);
          isAuthenticated = true;
        }
        )
        .catch(err => {
          this.setState({msg: err.response.data})
        })
}

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const { email, password } = this.state;

      const user = {
        email: email,
        password: password
      };

      // Attempt to register
      this.login(user);
    }
  };

  validateForm() {
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors['emailid'] = '*Please enter your email-ID.';
    }

    if (typeof email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors['emailid'] = '*Please enter valid email-ID.';
      }
    }

    if (!password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <form action="/login" method="POST" id="multistepsform">
        {/* <p style="margin-top: 150px;"></p> */}
        <fieldset>
          <h2 className="fs-title">Login to your Account</h2>
          <h3 className="fs-subtitle"></h3>
          <input
            type="text"
            name="email"
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <div className="errorMsg">{this.state.errors.emailid}</div>

          <span id="password-span">
            <input
              type="password"
              onChange={this.onChange}
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <i
              id="hide-password"
              className="far fa-eye-slash toggle-password"
            ></i>
            <i id="show-password" className="far fa-eye toggle-password"></i>
          </span>
          <div className="errorMsg">{this.state.errors.password}</div>

          <input
            type="submit"
            name="submit"
            onClick={this.onSubmit}
            className="submit action-button"
            value="Login"
            />

          {/*error alert */}
          {this.state.msg?
          <Stack sx={{ width: '100%' }} spacing={2}>
           <Alert variant="filled" severity="error">
             {this.state.msg}
           </Alert>
         </Stack>: null}

          <p className="forgot-password">
            <a href="./forget-pass">Forgot Password</a>
          </p>
        </fieldset>
        <p className="member-login">
          Not yet a member? <a href="register">Sign up</a>
        </p>
      </form>
    );
  }
}

export default Login;
