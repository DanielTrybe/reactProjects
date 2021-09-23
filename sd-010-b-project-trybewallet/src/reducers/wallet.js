const initialState = {
  expenses: [],
  id: 0,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'WALLET':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.id, ...action.value }],
      id: state.id + 1,
    };
  default:
    return state;
  }
}

export default walletReducer;
