/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveCampusOnServer } from '../../store/campuses';

class CampusSimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  // componentDidMount() {
  //   console.log(this.props)
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }

  onChange(ev) {
    const campus = {}
    campus[ev.target.name] = ev.target.value
    this.setState(campus)
  }

  onSave(ev) {
    ev.preventDefault()
    const { name } = this.state
    const id = undefined
    this.props.saveCampus({ id, name })
  }

  render() {
    const { name } = this.state
    const { onChange, onSave } = this
    return (
      <div style={{ margin: '0px 10px 40px'}}>
        <h1>Add new Campus</h1>

        <form onSubmit={onSave} className="form-group">
          <label>Campus Name</label>
          <input
            required
            onChange={ onChange }
            value={ name }
            name="name"
            className="form-control" />
          <button style={{marginTop: '15px'}} className="btn btn-outline-primary">Quick Create</button>
        </form>

        <button onClick={onSave} className="btn btn-outline-success">Add more details</button>
      </div>
    )
  }
}

const mapState = () => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {
    saveCampus: (campus) => dispatch(saveCampusOnServer(campus))
  }
}

export default connect(mapState, mapDispatch)(CampusSimpleForm);
