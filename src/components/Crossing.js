import React from 'react'

class Crossing extends React.Component {

  render () {
    console.log(this.props);

    return (
      <div className='pa3 bg-black-05 ma3'>
        <div className='pt3'>
          {this.props.crossing.name}&nbsp;
        </div>
        <div className='pt3'>
          {this.props.crossing.latestStatus.statusByStatusId.name}&nbsp;
        </div>
      </div>
    );
  }
}

export default Crossing;
