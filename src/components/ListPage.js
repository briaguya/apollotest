import React from 'react';
import Crossing from './Crossing';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ListPage extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allCrossings.map((crossing) =>
            <Crossing 
              key={crossing.id}
              crossing={crossing}
              refresh={() => this.props.data.refetch()}
            />
          )}
        </div>
      </div>
    );
  }

}

const FeedQuery = gql`
query allCrossings {
  allCrossings {
    edges {
      node {
        name
        latestStatus {
          status
        }
      }
    }
  }
}
`;

export default graphql(FeedQuery)(ListPage);
