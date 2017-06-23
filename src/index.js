import React from 'react';
import ReactDOM from 'react-dom';
import ListPage from './components/ListPage';
import Login from './components/Login';
import NewStatusUpdate from './components/NewStatusUpdate';
import auth from './services/auth';
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

auth.authenticate(() => {
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      next();
    }
  }]);
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route path='/' component={ListPage} />
        <Route path="/login" component={Login}/> 
        <Route path="/newstatusupdate" component={NewStatusUpdate}/>
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
);
