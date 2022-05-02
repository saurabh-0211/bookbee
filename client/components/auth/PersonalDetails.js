import { Component } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

class PersonalDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <TextField
            placeholder="First Name"
            label="First Name"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
            autoComplete="firstName"
          />
          <br />
          <br />
          <TextField
            placeholder="Last Name"
            label="Last Name"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
            autoComplete="lastName"
          />
          <br />
          <br />
          <TextField
            placeholder="Stream"
            label="Stream"
            onChange={handleChange('stream')}
            defaultValue={values.stream}
            autoComplete="stream"
            fullWidth
          />
          <br />
          <br />
          <TextField
            placeholder="Branch"
            label="Branch"
            onChange={handleChange('branch')}
            defaultValue={values.branch}
            autoComplete="branch"
            fullWidth
          />
          <br />
          <br />
          <TextField
            placeholder="Semester"
            label="Semester"
            onChange={handleChange('semester')}
            defaultValue={values.semester}
            autoComplete="semester"
            fullWidth
          />
          <br />
          <br />
          <Button
            onClick={this.back}
            type="submit"
            variant="contained"
            sx={{ width: '45%', margin: 1 }}
          >
            Back
          </Button>
          <Button
            onClick={this.continue}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '45%' }}
          >
            Next
          </Button>
        </Container>
      </ThemeProvider>
    );
  }
}

export default PersonalDetails;
