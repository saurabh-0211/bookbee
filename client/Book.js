import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const Book = ({ id, bookName, image, authors, rating, numRatings }) => {
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (image.length) {
    hero = image;
  }

  let sum = 0;
  for (let key in numRatings) {
    sum += numRatings[key];
  }

  return (
    <Link to={`/details/${id}`} className="book">
      <div className="image-container">
        <img src={hero} alt={bookName} />
      </div>
      <div className="info">
        <h1>{bookName}</h1>
        <h2 className="authors">{authors}</h2>
        <div>
          <Typography component="legend"> No.of Ratings: {sum}</Typography>
          <Rating name="read-only" size="large" value={rating} readOnly />
        </div>
      </div>
    </Link>
  );
};

export default Book;
