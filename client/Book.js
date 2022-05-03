import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

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
        <ReactStars
          count={5}
          size={30}
          value={rating}
          isHalf={true}
          edit={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <span className="ratings">No. of Ratings: {sum}</span>
      </div>
    </Link>
  );
};

export default Book;
