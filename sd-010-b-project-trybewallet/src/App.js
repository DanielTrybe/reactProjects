import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Principal from './Principal';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Principal } />
      </Switch>
    );
  }
}

export default App;
