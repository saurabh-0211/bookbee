import { Component } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

class UserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

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
