import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  state = {
    redirectToReferrer: false,
    username: '',
    password: ''
  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();

    console.log(this.props.data);

    // auth.authenticate(username, password, () => {
    //   this.setState({ redirectToReferrer: true })
    // });
  }

  render() {
    console.log(this.props.data);

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text"
                 value={this.state.username}
                 placeholder="Username"
                 onChange={this.handleUserChange.bind(this)}/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const AuthMutation = gql`
mutation {
  authenticate(input: {email: "srv@double.trouble", password: "texasfloods"}) {
    jwtToken
  }
}
`;

export default graphql(AuthMutation)(Login);
