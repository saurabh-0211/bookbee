import { Component } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
let newUser = true;
class UserDetails extends Component {
  state = {
    errors: {}
  };

  checkExisting = ({ email, password }) => {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    //request body
    const body = JSON.stringify({ email, password });

    axios
      .post('http://localhost:3000/bookbee/users/register', body, config)
      .then((res) => {
        console.log(res.data);
        newUser = false;
        this.state.errors['email'] = "Don't try to fool us.";
      })
      .catch((err) => {
        this.setState({ msg: err.response.data });
      });
  };

  continue = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, password } = this.props.values;

      const user = {
        email: email,
        password: password
      };

      this.props.nextStep();
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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
            placeholder="Username"
            label="Username"
            onChange={handleChange('username')}
            defaultValue={values.username}
            // variant="outlined"
            autoComplete="username"
            fullWidth
          />
          <br />
          <br />
          <TextField
            placeholder="Password"
            label="Password"
            onChange={handleChange('password')}
            defaultValue={values.password}
            autoComplete="password"
            fullWidth
          />
          <br />
          <br />
          <div className="errorMsg">{this.state.errors.password}</div>
          <Button
            onClick={this.continue}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Next
          </Button>
        </Container>
      </ThemeProvider>
    );
  }
}

export default UserDetails;
