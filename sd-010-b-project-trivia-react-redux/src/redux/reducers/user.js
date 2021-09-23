const initialState = {
  email: '',
  name: '',
  questions: {},
  config: {
    category: 'random',
    difficulty: 'random',
    type: 'random',
  },
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return ({
      ...state,
      email: action.value.email,
      name: action.value.name,
    });
  case 'FETCH_QUESTIONS':
    return ({
      ...state,
      questions: action.value,
    });
  case 'CUSTOM_GAME':
    return ({
      ...state,
      config: action.value,
    });
  default:
    return state;
  }
}

export default loginReducer;
