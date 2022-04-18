const Book = ({ _id, bookName, image, authors }) => {
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (image.length) {
    hero = image;
  }
  return (
    <a href={`/details/${_id}`} className="book">
      <div className="image-container">
        <img src={hero} alt={bookName} />
      </div>
      <div className="info">
        <h1>{bookName}</h1>
        <h2>{authors}</h2>
      </div>
    </a>
  );
};

export default Book;
