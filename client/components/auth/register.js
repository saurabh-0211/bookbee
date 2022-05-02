import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './register.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

class Register extends Component {
  state = {
    loading: 'true',
    email: '',
    password: '',
    stream: '',
    branch: '',
    semester: '',
    msg: null,
    errors: {}
    
  };

  async componentDidMount() {
    this.jQueryCode();
    this.setState({
      loading: false,
      email: '',
      password: '',
      stream: '',
      branch: '',
      semester: '',
      msg: null,
      errors: {}
    });
  }

  

  validateForm = () => {
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors['emailid'] = '*Please enter your email-ID.';
    }

    if (typeof email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors['emailid'] = '*Please enter valid email-ID.';
      }
    }

    if (!password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  };



  jQueryCode = () => {
    let current_field, next_field, prev_field, password, confirm_password;
    password = document.getElementById('password');
    confirm_password = document.getElementById('confirm_password');

    $('.toggle-password').on('click', function (e) {
      if (password.type === 'password') {
        console.log('Password type is text');
        password.type = 'text';
        confirm_password.type = 'text';
        $('#hide-password').hide();
        $('#show-password').show();
      } else {
        password.type = 'password';
        confirm_password.type = 'password';
        $('#hide-password').show();
        $('#show-password').hide();
      }
    });

    $('.next').on('click', function () {
      if (password.value != confirm_password.value) {
        console.log('password do not match');
        $('.alertMsg').show();
      } else {
        $('.alertMsg').hide();
        current_field = $(this).parent();
        next_field = $(this).parent().next();
        $('#progressbar li')
          .eq($('fieldset').index(next_field))
          .addClass('active');
        next_field.show().addClass('next-animation');
        current_field.hide();
      }
    });

    $('.previous').on('click', function (e) {
      current_field = $(this).parent();
      prev_field = $(this).parent().prev();
      $('#progressbar li')
        .eq($('fieldset').index(current_field))
        .removeClass('active');
      prev_field.show();
      current_field.hide();
    });
  };

  render() {
    if (this.state.loading) {
      return <h2>loading....</h2>;
    }
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
          <div className="alertMsg">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                Entered passwords must be same
              </Alert>
            </Stack>
          </div>

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
