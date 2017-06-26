import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { gql, graphql, compose } from 'react-apollo';

class NewStatusUpdate extends Component {
  state = {
    redirectToReferrer: false,
    crossingId: '',
    statusId: ''
  }

  handleCrossingChange(e) {
    this.setState({crossingId: e.value});
  }

  handleStatusChange(e) {
    this.setState({statusId: e.value});
  }

  handleSubmit(e) {
    this.props.mutate({
      variables: { statusId: this.state.statusId, crossingId: this.state.crossingId, authorId: 1 }
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
          name="select-crossing"
          value={this.state.crossingId}
          options={this.props.data.loading ? null : this.props.data.allCrossings.edges.map((crossing) => {return {value: crossing.node.id, label: crossing.node.name}})}
          onChange={this.handleCrossingChange.bind(this)}
        />
        <Select
          name="select-status"
          value={this.state.statusId}
          options={this.props.data.loading ? null : this.props.data.allStatuses.nodes.map((status) => {return {value: status.id, label: status.name}})}
          onChange={this.handleStatusChange.bind(this)}
        />
        <button onClick={this.handleSubmit.bind(this)}>Update Status</button>
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

const getDropdownData = gql`
  {
    allCrossings {
      edges {
        node {
          id
          name
        }
      }
    }
    allStatuses {
      nodes {
        id,
        name
      }
    }
  }
`;

export default compose(graphql(createStatusUpdate),graphql(getDropdownData))(NewStatusUpdate);
