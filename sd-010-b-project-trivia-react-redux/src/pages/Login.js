import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, login as loginAction } from '../redux/actions';
import trivia from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.emailValidation = this.emailValidation.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.customCategory = this.customCategory.bind(this);
    this.customDifficulty = this.customDifficulty.bind(this);
    this.customType = this.customType.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  customCategory() {
    const { customGame: { category, categoriesList } } = this.props;
    if (category !== 'random') {
      const id = categoriesList.find((categList) => categList.name === category);
      return `&category=${id.id}`;
    }
    return '';
  }

  customDifficulty() {
    const translate = {
      Fácil: 'easy',
      Médio: 'medium',
      Difícil: 'hard',
    };
    const { customGame: { difficulty } } = this.props;
    if (difficulty !== 'random') {
      return `&difficulty=${translate[difficulty]}`;
    }
    return '';
  }

  customType() {
    const translate = {
      Multipla_Escolha: 'multiple',
      Verdadeiro_ou_Falso: 'boolean',
    };
    const { customGame: { type } } = this.props;
    if (type !== 'random') {
      return `&type=${translate[type]}`;
    }
    return '';
  }

  emailValidation() {
    const { email } = this.state;
    if (email.match(/\S+@\S+\.com/)) {
      return true;
    }
    return false;
  }

  nameValidation() {
    const { name } = this.state;
    const nameNumber = 0;
    if (name.length > nameNumber) {
      return true;
    }
    return false;
  }

  buttonAvaliable() {
    if (this.emailValidation() && this.nameValidation()) {
      return true;
    }
    return false;
  }

  fetchToken() {
    const { login, history, fetchQuestionsAction } = this.props;
    const { email, name } = this.state;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      } };
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('state', JSON.stringify(player));
        return fetch(`https://opentdb.com/api.php?amount=5${this.customCategory()}${this.customDifficulty()}${this.customType()}&token=${response.token}`);
      })
      .then((response) => response.json())
      .then((response) => {
        fetchQuestionsAction(response);
        login(this.state);
        history.push('/jogo');
      });
  }

  // https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

  render() {
    return (
      <section className="login-section">
        <img src={ trivia } alt="trivia" />
        <form>
          <label htmlFor="name">
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ (e) => this.setState({ name: e.target.value }) }
              placeholder="Nome"
            />
          </label>
          <label htmlFor="email">
            <input
              name="email"
              type="text"
              data-testid="input-gravatar-email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="Email"
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !this.buttonAvaliable() }
            onClick={ () => this.fetchToken() }
            className="play-btn"
          >
            Jogar
          </button>
        </form>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
            className="config-btn"
          >
            Configurações
          </button>
        </Link>
        <Link to="/devs">
          <button type="button" className="dev-btn">Desenvolvedores</button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
  fetchQuestionsAction: (e) => dispatch(fetchQuestions(e)),
});

const mapStateToProps = (state) => ({
  customGame: state.user.config,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchQuestionsAction: PropTypes.func.isRequired,
  customGame: PropTypes.shape({
    category: PropTypes.string.isRequired,
    categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
