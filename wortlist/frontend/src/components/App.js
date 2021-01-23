import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import WordList from './WordList';
import WordDetail from './WordDetail';
import WordForm from './WordForm';
import Header from './Header';
import PageNotFound from './PageNotFound';

import { Provider } from 'react-redux';
import store from '../store';
import Alerts from './Alerts';

import './App.scss';

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
                <Route exact path='/' component={WordList} />
                <Route exact path='*' component={PageNotFound} />
              </Switch>
            </Router>
          </Fragment>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));