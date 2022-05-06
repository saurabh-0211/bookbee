import { useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserReview = ({ user, id, userReview }) => {
  const [rating, setRating] = useState(userReview ? parseInt(userReview.rating) : 0);
  const [comment, setComment] = useState(userReview ? userReview.comment : '');

  let button = userReview ? 'Edit Review' : 'Submit a Review';

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      postReview({ rating, comment });
    } else {
      console.log('You are not logged in');
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
    </div>
  );
};
export default UserReview;
