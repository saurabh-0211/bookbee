import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Rating from '@mui/material/Rating';
class Details extends Component {
  state = { loading: true, value: 0 };

  async componentDidMount() {
    const res = await fetch(`http://localhost:3000/bookbee/books/${this.props.match.params.id}`);
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false
        },
        json
      )
    );
  }

  render() {
    if (this.state.loading) {
      return <h2>loading....</h2>;
    }
    const { stream, subject, bookName, publisher, authors, image, rating, numRatings, numReviews } =
      this.state;
    return (
      <div className="details">
        <div className="book-img">
          <img src={image} alt={bookName} />
        </div>
        <div className="book-details">
          <div className="book-rating">
            <Rating name="read-only" size="small" value={rating} precision={0.5} readOnly />
            <span>
              {rating} Ratings & {numReviews} Reviews
            </span>
          </div>
          <h1>{bookName}</h1>
          <div className="list">
            <span>Details</span>
            <div className="book-info">
              <div className="item">
                <span>Stream</span>
                <h3 style={{ textTransform: 'capitalize' }}>{stream}</h3>
              </div>
              <div className="item">
                <span>Subject</span>
                <h3>{subject}</h3>
              </div>
              <div className="item">
                <span>Author</span>
                <h3>{authors}</h3>
              </div>
              <div className="item">
                <span>Publisher</span>
                <h3>{publisher}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
