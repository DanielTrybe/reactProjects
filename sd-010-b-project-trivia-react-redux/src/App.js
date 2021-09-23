import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Jogo from './pages/Jogo';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Grupo16 from './pages/Grupo16';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/devs" component={ Grupo16 } />
    </Switch>
  );
}
