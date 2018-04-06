/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCampusOnServer } from '../../store/campuses';
import { clearError } from '../../store/error'
import { Helmet } from 'react-helmet';
import { states } from '../../states'

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
      image_url: campus ? campus.image_url : '',
      details: campus ? false : true
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.showDetails = this.showDetails.bind(this)
    this.dismissError = this.dismissError.bind(this)
  }

  componentDidMount() {
    this.setState(this.props.campus)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.campus)
  }

  dismissError() {
    this.props.clearError({})
  }

  onChange(ev) {
    const campus = {}
    campus[ev.target.name] = ev.target.value
    this.setState(campus)
  }

  onSave(ev) {
    ev.preventDefault()
    const { id } = this.props
    const { name, description, street, city, state, zip, image_url } = this.state
    this.props.saveCampus({ id, name, description, street, city, state, zip, image_url })
  }

  showDetails() {
    this.setState({ details: false })
  }

  render() {
    const { campus, page, error } = this.props
    const { name, description, street, city, state, zip, image_url, details } = this.state
    const { onChange, onSave, showDetails, dismissError } = this
    const match = campus && campus.name === name && campus.description === description && campus.street === street && campus.city === city && campus.state === state && campus.zip === zip && campus.image_url === image_url ? true : false
    return (
      <div className="default-margins">
        <Helmet><title>{ campus ? ('Edit Campus') : ('Add Campus')}</title></Helmet>

        {
          campus ? (
          <h1>Editing: {campus.name}</h1>
          ) : (
          <h1>Add new Campus</h1>
          )
        }
        {
          error.message ? (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <strong>Something went wrong:</strong> {error.message}.
                <button type="button" className="close">
                <span onClick={dismissError}>&times;</span>
              </button>
            </div>
          ) : (
              null
            )
        }
        {
          details ? (
            <div>
              <form className="margin-top-10" onSubmit={onSave}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Name</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={onChange}
                      name="name"
                      // required
                    />
                  </div>
                </div>
              </form>
              <div className="flex">
                <div style={{marginRight: '20px'}}>
                  <button disabled={ !name } title="Add the name now and the details later!" className="btn btn-success" onClick={onSave}>Quick Create</button>
                </div>
                <div>
                  <button disabled={ !name } title="Add more information to the campus." className="btn btn-primary" onClick={showDetails}>Add Details</button>
                </div>
              </div>
            </div>
          ) : (
            <form className="margin-top-10" onSubmit={onSave}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Name</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={onChange}
                    name="name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={onChange}
                    name="description"
                    rows="4"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Street</label>
                <input
                  className="form-control"
                  value={street}
                  onChange={onChange}
                  name="street"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-7">
                  <label>City</label>
                  <input
                    className="form-control"
                    value={city}
                    onChange={onChange}
                    name="city"
                  />
                </div>

                <div className="form-group col-md-2">
                  <label>State</label>
                  <select
                    className="form-control"
                    value={state}
                    onChange={onChange}
                    name="state"
                  >
                    <option>Choose...</option>
                    {
                      states.map(state => (
                        <option key={state.id}>{state.abbrev}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label>Zip</label>
                  <input
                    className="form-control"
                    value={zip}
                    onChange={onChange}
                    name="zip"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Campus Image</label>
                  <input
                    className="form-control"
                    value={image_url}
                    onChange={onChange}
                    name="image_url"
                  />
                </div>
              </div>
              {
                campus ? (
                  <div>
                    <button disabled={match} className="btn btn-success">Update Campus</button>
                    <br /><br />
                    <Link to={`/campuses/${campus.id}`}>
                      <button className="btn btn-secondary">Cancel Edit</button>
                    </Link>
                  </div>
                ) : (
                    <button className="btn btn-success">Save Campus</button>
                  )
              }
            </form>
          )
        }

      </div>
    )
  }
}

const mapState = ({ campuses, students, error }, { id, page }) => {
  const campus = campuses.find(campus => campus.id === id)
  const campus_students = students.find(s => s.campus_id === id)
  return { campus, campus_students, page, error }
}

const mapDispatch = (dispatch) => {
  return {
    saveCampus: (campus) => dispatch(saveCampusOnServer(campus)),
    clearError: (err) => dispatch(clearError(err))
  }
}

export default connect(mapState, mapDispatch)(CampusForm);
