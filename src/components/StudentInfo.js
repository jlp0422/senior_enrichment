/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

class StudentInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // console.log(this.props)
    this.setState(this.props.student)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(nextProps.student)
    }
  }

  render() {
    console.log(this.state)
    const { student, campus } = this.props
    return (
      <div>
      {
        student &&
        <h2>Student: { student.full_name } </h2>
      }
      </div>
    )
  }
}

const mapState = ({ students, campuses }, { id }) => {
  const student = students.find(s => s.id === id)
  const campus = student && campuses.find(c => c.id === student.campus_id)
  return { student, campus }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(StudentInfo);
