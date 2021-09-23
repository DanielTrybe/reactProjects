import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { wallet as walletAction } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      value: 0,
      method: '',
      description: '',
      currency: '',
      tag: '',
    };

    this.labelValor = this.labelValor.bind(this);
    this.labelPagamento = this.labelPagamento.bind(this);
    this.labelDescription = this.labelDescription.bind(this);
    this.setState = this.setState.bind(this);
    this.todasDespesas = this.todasDespesas.bind(this);
    this.labelTag = this.labelTag.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()).then((response) => {
        const object = Object.values(response);
        const lista = object.filter((itens) => itens.codein !== 'BRLT');
        this.setState({ categories: lista });
      });
  }

  todasDespesas() {
    const { wallet } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()).then((response) => {
        const itens = response;
        // const object = Object.values(response);
        // const lista = object.filter((itens) => itens.codein !== 'BRLT');
        const { value, method, description, currency, tag } = this.state;
        const result = {
          value,
          method,
          description,
          currency,
          tag,
          exchangeRates: itens,
        };
        wallet(result);
      });
  }
  // agradecimento ao Lucas Martins e Diego pela ajuda para corrigir a função acima.

  mudaEstado({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  labelValor() {
    return (
      <label htmlFor="valor">
        Valor:
        <input
          onChange={ (event) => this.mudaEstado(event) }
          type="text"
          name="value"
          id="valor"
        />
      </label>
    );
  }

  labelPagamento() {
    return (
      <label htmlFor="despesa">
        Método de pagamento:
        <select
          onChange={ (event) => this.mudaEstado(event) }
          name="method"
          id="despesa"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  labelDescription() {
    return (
      <label htmlFor="Descrição">
        Descrição:
        <input
          onChange={ (event) => this.mudaEstado(event) }
          type="text"
          name="description"
          id="Descrição"
        />
      </label>
    );
  }

  labelTag() {
    return (
      <label htmlFor="Tag">
        Tag
        <select onChange={ (event) => this.mudaEstado(event) } name="tag" id="Tag">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  totalValue() {
    const { carteira } = this.props;
    if (carteira.length === 0) {
      return 0;
    }
    return (
      carteira.reduce((valorAcc, carteiras) => {
        const { value, currency, exchangeRates } = carteiras;
        const valueToNumber = parseFloat(value);
        const { ask } = exchangeRates[currency];
        const brlExpense = valueToNumber * ask;
        return brlExpense + valorAcc;
      }, 0));
  }
  // agradecimento ao Lucas Martins pela ajuda na solução desta etapa de soma.

  render() {
    const { user, carteira } = this.props;
    const { categories } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">{user.email}</p>
          <p data-testid="total-field">{this.totalValue()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          {this.labelValor()}
          <label htmlFor="moeda">
            Moeda:
            <select
              onChange={ (event) => this.mudaEstado(event) }
              name="currency"
              id="moeda"
            >
              {categories.map(({ code }) => (
                <option
                  key={ code }
                  value={ code }
                >
                  { code }
                </option>))}
            </select>
          </label>
          {this.labelPagamento()}
          {this.labelTag()}
          {this.labelDescription()}
        </form>
        <button
          type="button"
          onClick={ () => this.todasDespesas() }
        >
          Adicionar despesa
        </button>
        <ol>
          {carteira.map((itens) => (
            <li key={ itens.method }>
              {itens.method}
              {itens.value}
            </li>))}
        </ol>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  carteira: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  wallet: (e) => dispatch(walletAction(e)),
});

Wallet.propTypes = {
  user: PropTypes.objectOf().isRequired,
  carteira: PropTypes.objectOf().isRequired,
  wallet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
