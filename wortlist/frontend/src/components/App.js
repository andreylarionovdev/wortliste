import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import WordList from './quiz/WordList';
import WordDetail from './quiz/WordDetail';
import Header from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header></Header>
          <Router>
            <Switch>
              <Route path='/word/:word_id' component={WordDetail} />
              <Route path='/' component={WordList} />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));