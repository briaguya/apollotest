import React from 'react';
import Crossing from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  render () {
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          TODO: Display all crossings...
        </div>
      </div>
    );
  }
}

export default ListPage;
