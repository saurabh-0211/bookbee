import ReactStars from 'react-rating-stars-component';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

const ratingChanged = (newRating) => {
  console.log(newRating);
};
class Details extends Component {
  state = { loading: true };

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
    const { stream, subject, bookName, publisher, authors, image, rating, numRatings } = this.state;
    return (
      <div className="details">
        <div className="carousel">
          <img src={image} alt={bookName} />
        </div>
        <div>
          <h1>{`${subject} -${bookName}`}</h1>
          <h2>{`${stream} - ${authors} - ${publisher}`}</h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={30}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
