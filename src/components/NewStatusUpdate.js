import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class NewStatusUpdate extends Component {
  state = {
    redirectToReferrer: false,
    crossings: [],
    password: ''
  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    this.props.mutate({
      variables: { statusId: 1, crossingId: 1, authorId: 1 }
    })
      .then(({ data }) => {
        console.log('got data', data);
        window.location.reload();
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  // onClick() {
  //   this.props.mutate({
  //     variables: { statusId: 1, crossingId: 1, authorId: 1 }
  //   })
  //   .then(({ data }) => {
  //     console.log('got data', data);
  //   }).catch((error) => {
  //     console.log('there was an error sending the query', error);
  //   });
  // }

  render() {
    return (
      <div>
        <input type="text"
               value={this.state.username}
               placeholder="Username"
               onChange={this.handleUserChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <button onClick={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

const createStatusUpdate = gql`
  mutation($statusId: Int!, $crossingId: Int!, $authorId: Int!) {
    createStatusUpdate(input: {statusUpdate: 
      {
        statusId: $statusId,
        crossingId: $crossingId,
        authorId: $authorId
      }
    }) {
      statusUpdate {
        id
      }
    }
  }
`;

export default graphql(createStatusUpdate)(NewStatusUpdate);
