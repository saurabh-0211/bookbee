import { useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UserReview = ({ user, id, userReview }) => {
  const [rating, setRating] = useState(userReview ? parseInt(userReview.rating) : 0);
  const [comment, setComment] = useState(userReview ? userReview.comment : '');
  const [open, setOpen] = useState(false);

  let button = userReview ? 'Edit Review' : 'Submit a Review';
  let modal = user ? 'Your Review is Successfully Submitted' : 'You are not logged in';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postReview = ({ rating, comment }) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    // request body
    const body = JSON.stringify({ rating, comment });
    console.log(body);

    axios
      .post(`http://localhost:3000/bookbee/books/${id}/reviews`, body, config)
      .then((res) => {
        console.log(res.data);
        handleClickOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (rating) {
      if (user) {
        postReview({ rating, comment });
      } else {
        handleClickOpen();
      }
    }
  };

  return (
    <div style={{ filter: userReview ? 'grayscale(60%)' : 0 }} className="reviews">
      <Rating
        name="simple-controlled"
        size="large"
        value={parseInt(rating)}
        onChange={(e) => setRating(e.target.value)}
        className="user-ratings"
        required
      />
      <TextField
        id="filled-multiline-static"
        label="Write a review"
        placeholder="Write a review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="filled"
        rows={4}
        multiline
      />
      <Button type="submit" onClick={onSubmit} variant="contained" color="primary">
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{modal}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UserReview;
