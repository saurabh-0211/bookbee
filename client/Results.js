import Book from './Book';

const Results = ({ books }) => {
  return (
    <div className="search">
      {!books.length ? (
        <h2> No Books Found</h2>
      ) : (
        books.map((book) => (
          <Book
            key={book._id}
            id={book._id}
            bookName={book.bookName}
            image={book.image}
            authors={book.authors}
            rating={book.rating}
            numRatings={book.numRatings}
          />
        ))
      )}
    </div>
  );
};

export default Results;
