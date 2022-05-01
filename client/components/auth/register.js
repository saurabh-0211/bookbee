import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './register.css';
import 'font-awesome/css/font-awesome.min.css';

class Register extends Component {
  render() {
    return (
      <form action="/register" method="POST" id="multistepsform">
        <ul id="progressbar">
          <li className="active">Account Setup</li>
          <li>Personal Details</li>
          <li>Social Profiles</li>
        </ul>

        <fieldset>
          <h2 className="fs-title">Create your account</h2>
          <h3 className="fs-subtitle"></h3>
          <input type="text" name="email" placeholder="Email" />
          <span id="password-span">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <i
              id="hide-password"
              className="fa fa-eye-slash toggle-password"
            ></i>
            <i id="show-password" className="fa fa-eye toggle-password"></i>
          </span>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          {/* <p style="display: none; color:crimson;" className="alertMsg">
            <i className="fas fa-exclamation-circle"></i>
            <span>Entered Passwords must be same </span>
          </p> */}
          <input
            type="button"
            name="next"
            id="nextButton"
            className="next action-button"
            value="Next"
          />
        </fieldset>

        <fieldset>
          <h2 className="fs-title">Personal Details</h2>
          <h3 className="fs-subtitle">We will never sell it</h3>
          <input
            type="text"
            id="fname"
            name="first_name"
            placeholder="First Name"
          />
          <input
            type="text"
            id="lname"
            name="last_name"
            placeholder="Last Name"
          />
          <input type="text" name="phone" placeholder="Phone" />
          <input type="date" name="dob" placeholder="DOB" />
          <textarea name="address" placeholder="Address"></textarea>
          <input
            type="button"
            name="previous"
            className="previous action-button"
            value="Previous"
          />

          <input
            type="button"
            name="next"
            className="next action-button"
            value="Next"
          />
        </fieldset>
        <fieldset>
          <h2 className="fs-title">Social Profiles</h2>
          <h3 className="fs-subtitle">Your presence on the social network</h3>
          <input type="text" name="twitter" placeholder="Twitter" />
          <input type="text" name="facebook" placeholder="Facebook" />
          <input type="text" name="gplus" placeholder="Google Plus" />
          <input
            type="button"
            name="previous"
            className="previous action-button"
            value="Previous"
          />
          <input
            type="submit"
            name="submit"
            className="submit action-button"
            value="Submit"
          />
        </fieldset>

        <p className="member-login">
          Already a member? <a href="login">Sign in</a>
        </p>
      </form>
    );
  }
}

export default Register;
