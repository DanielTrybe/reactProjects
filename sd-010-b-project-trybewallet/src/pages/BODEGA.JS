this.setState({
  categories: lista,
  expenses: [...expenses, { value,
    currency,
    method,
    tag,
    description,
    exchangeRates: lista }],
});
