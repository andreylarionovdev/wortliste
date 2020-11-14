import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import WordList from './words/WordList';
import WordDetail from './words/WordDetail';
import WordForm from './words/WordForm';
import Header from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';
import Alerts from './layout/Alerts';

const alertOptions = {
  timeout: 3000,
  position: 'top center',
  type: 'error',
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <Header />
            <Alerts />
            <Router>
              <Switch>
                <Route path='/word/check/:word_id' component={WordForm} />
                <Route path='/word/:word_id' component={WordDetail} />
                <Route path='/' component={WordList} />
              </Switch>
            </Router>
          </Fragment>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));