const Book = ({ _id, bookName, image, authors }) => {
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (image.length) {
    hero = image;
  }
  return (
<<<<<<< HEAD
    <div>
      <h2>{props.subject}</h2>
      <h3>{props.bookName}</h3>
      <h3>{props.semester}</h3>
    </div>
=======
    <a href={`/details/${_id}`} className="book">
      <div className="image-container">
        <img src={hero} alt={bookName} />
      </div>
      <div className="info">
        <h1>{bookName}</h1>
        <h2>{authors}</h2>
      </div>
    </a>
>>>>>>> 5741dd2c5a0dbfa394791da5b1bc09da7a14857d
  );
};

export default Book;
