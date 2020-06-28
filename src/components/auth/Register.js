import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
        <div className="container-login100">
          <div className="wrap-login100">
            {/* <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link> */}

            <form className="login100-form validate-form" noValidate onSubmit={this.onSubmit}>
              <span className="login100-form-title p-b-43">Register below</span>
              <div className="wrap-input100 validate-input">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })} className="input100"
                />
                <label className="label-input100" htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })} className="input100"
                />
                <label className="label-input100" htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })} className="input100"
                />
                <label className="label-input100" htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })} className="input100"
                />
                <label className="label-input100" htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="container-login100-form-btn">
                <button
                  type="submit"
                  className="login100-form-btn"
                >
                  Sign up
                </button>
              </div>

            <div className="text-center p-t-46 p-b-20">
              <p className="txt1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>

            </form>
          </div>
        </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

//export default Register;