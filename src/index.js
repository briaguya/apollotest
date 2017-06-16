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
