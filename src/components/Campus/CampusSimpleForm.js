/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveCampusOnServer } from '../../store/campuses';
import CampusForm from './CampusForm';

class CampusSimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      details: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.openForm = this.openForm.bind(this)
  }

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

  openForm() {
    const { name } = this.state
    const id = undefined
    this.props.saveCampus({id, name}, 'simple')
    this.setState({ details: true })
  }

  render() {
    const { name, details} = this.state
    const { onChange, onSave, openForm } = this
    return (
      <div style={{ margin: '0px 10px 40px'}}>

      {
        details ? (
          <CampusForm campus={{ campus: this.props.campus }}/>
        ) : (
        <div>
          <h1>Add new Campus</h1>
          <form onSubmit={onSave} className="form-group">
            <label>Name</label>
            <input
              required
              onChange={ onChange }
              value={ name }
              name="name"
              className="form-control" />
              <button disabled={ !name } style={{ marginTop: '15px' }} className="btn btn-outline-primary">Quick Create</button>
          </form>
          <button onClick={openForm} disabled={ !name } className="btn btn-outline-success">Add more details</button>
        </div>

        )
      }
      </div>
    )
  }
}

const mapState = ({campuses}, {id}) => {
  console.log(campuses, id)
  const campus = campuses.find(campus => campus.id === id * 1)
  console.log(campus)
  return {
    campus
  }
}

const mapDispatch = (dispatch) => {
  return {
    saveCampus: (campus, page) => dispatch(saveCampusOnServer(campus, page))
  }
}

export default connect(mapState, mapDispatch)(CampusSimpleForm);
