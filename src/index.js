import React from 'react';
import ReactDOM from 'react-dom';
import ListPage from './components/ListPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'tachyons';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: 'https://df3yrm54i8.execute-api.us-east-1.amazonaws.com/dev/graphql'
});

// TODO: Add an auth flow
const token = "Bearer TOKEN GOES HERE";
localStorage.setItem('token',token);

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <Route path='/' component={ListPage} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
);
