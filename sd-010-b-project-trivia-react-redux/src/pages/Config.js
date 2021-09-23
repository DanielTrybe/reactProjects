import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { customGame } from '../redux/actions';

class Config extends React.Component {
  constructor() {
    super();
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      category: 'random',
      difficulty: 'random',
      type: 'random',
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.renderCategories();
  }

  onChangeSelect({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  onClick() {
    const { configGame } = this.props;
    configGame(this.state);
  }

  renderCategories() {
    return fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          categoriesList: response.trivia_categories,
        });
      });
  }

  renderForm() {
    const { categoriesList } = this.state;
    return (
      <form className="config-form">
        <label htmlFor="category">
          CATEGORIA
          <select id="category" name="category" onChange={ this.onChangeSelect }>
            <option name="random">Aleatório</option>
            { categoriesList.map((category, index) => (
              <option key={ index }>{category.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="difficulty">
          DIFICULDADE
          <select id="difficulty" name="difficulty" onChange={ this.onChangeSelect }>
            <option name="random">Aleatório</option>
            <option>Fácil</option>
            <option>Médio</option>
            <option>Difícil</option>
          </select>
        </label>
        <label htmlFor="type">
          TIPO
          <select id="type" name="type" onChange={ this.onChangeSelect }>
            <option name="random">Aleatório</option>
            <option name="multiple">Multipla_Escolha</option>
            <option name="boolean">Verdadeiro_ou_Falso</option>
          </select>
        </label>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
            className="config-section-btn"
            onClick={ this.onClick }
          >
            &#9658;
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <section className="body-section">
        <section className="config-section">
          <h1 data-testid="settings-title">
            <span role="img" aria-label="cog">&#9881;&#65039;</span>
            Configurações
          </h1>
          { this.renderForm() }
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  configGame: (value) => dispatch(customGame(value)),
});

Config.propTypes = {
  configGame: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
