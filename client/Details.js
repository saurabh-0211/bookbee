import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Details extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }
  async componentDidMount() {
    const res = await fetch(
      `http://localhost:3000/bookbee/books?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false
        },
        json[0]
      )
    );
  }
  render() {
    const { stream, subject, bookName, publisher, authors, rating } =
      this.state;
    return (
      <div className="details">
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
