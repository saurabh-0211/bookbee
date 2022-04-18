import React, { Component } from 'react';
// import './login.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null,
    errors: {}
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const { email, password } = this.state;

      const user = {
        email: email,
        password: password
      };

      // Attempt to register
      this.props.login(user);
    }
  };

  validateForm() {
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
  }

  render() {
    return (
      <div id="loginform">
        <FormHeader title="Login" />

        <div>
          <div className="row">
            <label>Email</label>
            <input
              name="email"
              onChange={this.onChange}
              type="email"
              placeholder="Enter your username"
              required
            />
            <div className="errorMsg">{this.state.errors.emailid}</div>
          </div>

          <div className="row">
            <label>Password</label>
            <input
              name="password"
              onChange={this.onChange}
              type="password"
              placeholder="Enter your password"
              required
            />
            <div className="errorMsg">{this.state.errors.password}</div>
          </div>

          <div id="button" className="row">
            <button onClick={this.onSubmit}>Log in</button>
          </div>
        </div>

        <OtherMethods />
      </div>
    );
  }
}

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

// const Form = props => (
//    <div>
//      <FormInput description="Username" placeholder="Enter your username" type="text" />
//      <FormInput description="Password" placeholder="Enter your password" type="password"/>
//      <FormButton title="Log in"/>
//    </div>
// );

// const FormButton = props => (
//   <div id="button" className="row">
//     <button>{props.title}</button>
//   </div>
// );

// const FormInput = props => (
//   <div className="row">
//     <label>{props.description}</label>
//     <input type={props.type} placeholder={props.placeholder} required/>
//   </div>
// );

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = (props) => <a href="#" id="facebookIcon"></a>;

const Twitter = (props) => <a href="#" id="twitterIcon"></a>;

const Google = (props) => <a href="#" id="googleIcon"></a>;

export default LoginForm;
