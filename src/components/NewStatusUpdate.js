import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { gql, graphql, compose } from 'react-apollo';

class NewStatusUpdate extends Component {
  state = {
    redirectToReferrer: false,
    crossingId: '',
    password: ''
  }

  handleCrossingChange(e) {
    this.setState({crossingId: e.value});
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
        <Select
          name="form-field-name"
          options={this.props.data.loading ? null : this.props.data.allCrossings.edges.map((crossing) => {return {value: crossing.node.id, label: crossing.node.name}})}
          onChange={this.handleCrossingChange.bind(this)}
        />
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

const getCrossingNames = gql`
  {
    allCrossings {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export default compose(graphql(createStatusUpdate),graphql(getCrossingNames))(NewStatusUpdate);
