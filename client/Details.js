import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://localhost:3000/bookbee/books/${this.props.match.params.id}`
    );
    const json = await res.json();
    console.log(json);
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
    const { stream, subject, bookName, publisher, authors, image, rating } =
      this.state;
    return (
      <div className="details">
        <div className="carousel">
          <img src={image} alt={bookName} />
        </div>
        <div>
          <h1>{`${subject} -${bookName}`}</h1>
          <h2>{`${stream} - ${authors} - ${publisher}`}</h2>
          <button>{rating}</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
