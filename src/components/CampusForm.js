/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CampusForm extends React.Component {
  constructor(props) {
    super(props)
    const { campus } = this.props
    this.state = {
      name: campus ? campus.name : '',
      description: campus ? campus.description : '',
      street: campus ? campus.street : '',
      city: campus ? campus.city : '',
      state: campus ? campus.state : '',
      zip: campus ? campus.zip : '',
      image_url: campus ? campus.image_url : ''
    }
  }

  render() {
    return (
      <hr />
    )
  }
}

const mapState = () => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(CampusForm);
