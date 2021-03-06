import { Component } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.register();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { email, username, password, firstName, lastName, stream, branch, semester }
    } = this.props;
    return (
      <Container className="reviews" component="main" maxWidth="xs">
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Username" secondary={username} />
          </ListItem>
          <ListItem>
            <ListItemText primary="First Name" secondary={firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Stream" secondary={stream} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Semester" secondary={semester} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Branch" secondary={branch} />
          </ListItem>
        </List>
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
          Confirm
        </Button>
      </Container>
    );
  }
}

export default Confirm;
