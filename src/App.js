import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Matrix from './page/Matrix';
import TodoList from './page/TodoList';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/matrix">
            <Matrix />
          </Route>
          <Route exact path="/list">
            <TodoList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
