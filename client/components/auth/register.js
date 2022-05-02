import { Component } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirm from './Confirm';
import Success from './Success';

export class Register extends Component {
  state = {
<<<<<<< HEAD
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
=======
    step: 1,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    stream: '',
    semester: '',
    branch: ''
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
>>>>>>> a98810035af06ee262d4c7574c20ae572539bd1f

  // handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      branch,
      semester
    } = this.state;

    const values = {
      email,
      username,
      password,
      firstName,
      lastName,
      stream,
      branch,
      semester
    };

    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      // never forget the default case, otherwise VS code would be mad!
      default:
        console.log('This is a multi-step form built with React.');
    }
  }
}

export default Register;
