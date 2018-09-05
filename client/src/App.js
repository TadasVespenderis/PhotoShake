import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
