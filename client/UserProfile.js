import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';

import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  profile: {
    display: 'inline-block',
    width: '50%',
    padding: '5px 10px'
  },
  customProfile: {
    padding: '5px 10px'
  },
  loginBtn: {
    margin: '20px 30px'
  }
}));

const UserProfile = ({ user }) => {
  const classes = useStyles();
  if (!user) {
    return <Redirect to={{ pathname: '/' }} />;
  }
  console.log(user);
  const [fName, setfName] = useState(user.name.split(' ')[0]);
  const [lName, setlName] = useState(user.name.split(' ')[1]);
  const [branch, setBranch] = useState(user.branch);
  const [semester, setSemester] = useState(user.semester);

  const updateUser = ({ fName, lName, branch, semester }) => {
    const name = fName + ' ' + lName;
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    // request body
    const body = JSON.stringify({ name, branch, semester });
    console.log(body);

    axios
      .post(`http://localhost:3000/bookbee/users/register`, body, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({ fName, lName, branch, semester });
  };

  return (
    <Container className="reviews" component="main" maxWidth="lg">
      <div className={classes.profile}>
        <div className={classes.customProfile}>
          <InputLabel>First Name</InputLabel>
          <TextField
            value={fName}
            onChange={(e) => setfName(e.target.value)}
            placeholder="First Name"
            autoComplete="firstName"
            fullWidth
          />
        </div>
        <div className={classes.customProfile}>
          <InputLabel>Branch</InputLabel>
          <TextField
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch"
            autoComplete="branch"
            fullWidth
          />
        </div>
      </div>
      <div className={classes.profile}>
        <div className={classes.customProfile}>
          <InputLabel>Last Name</InputLabel>
          <TextField
            value={lName}
            onChange={(e) => setlName(e.target.value)}
            placeholder="Last Name"
            autoComplete="lastName"
            fullWidth
          />
        </div>
        <div className={classes.customProfile}>
          <InputLabel>Semester</InputLabel>
          <TextField
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Semester"
            autoComplete="semester"
            fullWidth
          />
        </div>
      </div>
      <Button
        className={classes.loginBtn}
        onClick={onSubmit}
        type="submit"
        variant="contained"
        color="primary"
      >
        Update
      </Button>
    </Container>
  );
};

export default UserProfile;
