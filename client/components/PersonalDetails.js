import { Component } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

const SEMESTER = ['1', '2', '3', '4', '5', '6', '7', '8'];
const BRANCH = ['CMPN', 'IT', 'EXTC', 'ELEX', 'CIVIL', 'MECH'];
const STREAM = ['engineering', 'commerce'];
class PersonalDetails extends Component {
  state = {
    semester: ''
  };
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
            label="First Name"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
            autoComplete="firstName"
          />
          <br />
          <br />
          <TextField
            label="Last Name"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
            autoComplete="lastName"
          />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="stream">Stream</InputLabel>
            <Select
              labelId="stream"
              id="stream"
              value={values.stream}
              label="Stream"
              onChange={handleChange('stream')}
            >
              <MenuItem />
              {STREAM.map((stream) => (
                <MenuItem value={stream} key={stream}>
                  {stream}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="branch">Branch</InputLabel>
            <Select
              labelId="branch"
              id="branch"
              value={values.branch}
              label="Branch"
              onChange={handleChange('branch')}
            >
              <MenuItem />
              {BRANCH.map((branch) => (
                <MenuItem value={branch} key={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="semester">Semester</InputLabel>
            <Select
              labelId="semester"
              id="semester"
              value={values.semester}
              label="Semester"
              onChange={handleChange('semester')}
            >
              <MenuItem />
              {SEMESTER.map((semester) => (
                <MenuItem value={semester} key={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
