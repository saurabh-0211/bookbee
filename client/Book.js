import { Link } from 'react-router-dom';
const Book = ({ id, bookName, image, authors }) => {
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (image.length) {
    hero = image;
  }
  return (
    <Link to={`/details/${id}`} className="book">
      <div className="image-container">
        <img src={hero} alt={bookName} />
      </div>
      <div className="info">
        <h1>{bookName}</h1>
        <h2>{authors}</h2>
      </div>
    </Link>
  );
};

export default Book;
