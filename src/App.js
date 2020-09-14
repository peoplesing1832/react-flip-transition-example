import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Matrix from './page/Matrix';
import TodoList from './page/TodoList';
import Nav from './page/Nav';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Matrix />
          </Route>
          <Route path="/todolist">
            <TodoList />
          </Route>
          <Route path="/nav">
            <Nav />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
