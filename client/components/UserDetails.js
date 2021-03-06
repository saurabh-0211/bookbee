import { Component } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

class UserDetails extends Component {
  state = {
    showPassword: false,
    errors: {}
  };

  handleClickShowPassword = () => this.setState({ showPassword: !this.state.showPassword });
  handleMouseDownPassword = () => this.setState({ showPassword: !this.state.showPassword });

  checkExisting = ({ email, username }) => {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    //request body
    const body = JSON.stringify({ email, username });

    axios
      .post('http://localhost:3000/bookbee/users/checkExisting', body, config)
      .then((res) => {
        console.log(res.data);
        this.props.nextStep();
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(this.state.errors);
        if (err.response.status === 400) {
          this.setState({
            errors: { email: err.response.data, username: null }
          });
        }
        if (err.response.status === 409) {
          this.setState({
            errors: { email: null, username: err.response.data }
          });
        }
      });
  };

  continue = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, username } = this.props.values;

      const user = {
        email: email,
        username: username
      };

      this.checkExisting(user);
    }
  };

  validateForm() {
    let email = this.props.values.email;
    let password = this.props.values.password;
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email-ID.';
    }

    if (typeof email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors['email'] = '*Please enter valid email-ID.';
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
    const { values, handleChange } = this.props;
    return (
      <Container className="reviews" component="main" maxWidth="xs">
        <TextField
          placeholder="Email Address"
          label="Email Address"
          onChange={handleChange('email')}
          defaultValue={values.email}
          // variant="outlined"
          autoComplete="email"
          fullWidth
        />
        <br />
        <br />
        <div className="errorMsg">{this.state.errors.email}</div>

        <TextField
          label="Username"
          onChange={handleChange('username')}
          defaultValue={values.username}
          // variant="outlined"
          autoComplete="username"
          fullWidth
        />
        <br />
        <br />
        <div className="errorMsg">{this.state.errors.username}</div>
        <TextField
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={handleChange('password')}
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
        <Button onClick={this.continue} type="submit" variant="contained" color="primary" fullWidth>
          Next
        </Button>
      </Container>
    );
  }
}

export default UserDetails;
