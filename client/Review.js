import { useState } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Review = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="reviews">
      <Rating
        name="simple-controlled"
        size="large"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="user-ratings"
      />
      <TextField
        id="filled-multiline-static"
        label="Write a review"
        multiline
        rows={4}
        placeholder="Write a review"
        value="Hello"
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit a Review
      </Button>
    </div>
  );
};
export default Review;
