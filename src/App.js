import React from 'react';
import logo from './favicon.ico';
import Session from './components/Session/Session';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/session/:sessionId" component={Session}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
