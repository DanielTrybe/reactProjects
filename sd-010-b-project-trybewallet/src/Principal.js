import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login as loginAction } from './actions';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
  }

  emailValidation() {
    const { email } = this.state;
    if (email.match(/[a-z]+@[a-z]+.com/g)) {
      return true;
    }
    return false;
  }

  passwordValidation() {
    const { password } = this.state;
    const passNumber = 6;
    if (password.length >= passNumber) {
      return true;
    }
    return false;
  }

  buttonAvaliable() {
    if (this.emailValidation() && this.passwordValidation()) {
      return true;
    }
    return false;
  }

  render() {
    const { email } = this.state;
    const { login } = this.props;
    return (
      <div>
        <p>Faça seu login</p>
        <input
          type="email"
          onChange={ (e) => this.setState({ email: e.target.value }) }
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ (e) => this.setState({ password: e.target.value }) }
          data-testid="password-input"
        />
        <Link
          to="/carteira"
        >
          <button
            type="button"
            onClick={ () => login(email) }
            disabled={ !this.buttonAvaliable() }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

App.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
