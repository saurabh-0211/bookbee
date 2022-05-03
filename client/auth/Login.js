import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Alert,
  Stack,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

let isAuthenticated = false;

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null,
    showPassword: true,
    errors: {}
  };

  handleClickShowPassword = () => this.setState({ showPassword: !this.state.showPassword });
  handleMouseDownPassword = () => this.setState({ showPassword: !this.state.showPassword });

  login = ({ email, password }) => {
    //Headers
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    //request body
    const body = JSON.stringify({ email, password });

    axios
      .post('http://localhost:3000/bookbee/users/login', body, config)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
        isAuthenticated = true;
        this.setState({ msg: null });
      })
      .catch((err) => {
        this.setState({ msg: err.response.data });
      });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
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
      <Container component="main" maxWidth="xs">
        <TextField
          label="Email Address"
          onChange={this.handleChange('email')}
          defaultValue={this.state.email}
          // variant="outlined"
          autoComplete="email"
          fullWidth
        />
        <br />
        <br />
        <div className="errorMsg">{this.state.errors.emailid}</div>

        <TextField
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={this.handleChange('password')}
          defaultValue={this.state.password}
          autoComplete="password"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <br />
        <br />
        <div className="errorMsg">{this.state.errors.password}</div>
        <Button onClick={this.onSubmit} type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        {this.state.msg ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="error">
              {this.state.msg}
            </Alert>
          </Stack>
        ) : null}
      </Container>
    );
  }
}

export default Login;
