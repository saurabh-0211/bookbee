const Book = (props) => {
  return (
    <div>
      <h2>{props.subject}</h2>
      <h3>{props.bookName}</h3>
      <h3>{props.semester}</h3>
    </div>
  );
};

export default Book;
