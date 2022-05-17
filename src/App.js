import React from 'react';
import logo from './logo.svg';
import Session from './features/Session/Session';
import HomePage from './features/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/lauren-malik/lauren-malik.github.io" component={HomePage}></Route>
          <Route path="/lauren-malik/lauren-malik.github.io/session/:sessionId" component={Session}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
