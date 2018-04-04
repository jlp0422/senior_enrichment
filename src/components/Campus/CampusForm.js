/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCampusOnServer } from '../../store/campuses';
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
      image_url: campus ? campus.image_url : ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.setState(this.props.campus)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.campus)
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

  render() {
    console.log(this)
    const { campus } = this.props
    const { name, description, street, city, state, zip, image_url } = this.state
    const { onChange, onSave } = this
    const match = campus && campus.name === name && campus.description === description && campus.street === street && campus.city === city && campus.state === state && campus.zip === zip && campus.image_url === image_url ? true : false

    return (
      <div style={{ margin: '0px 10px 40px' }}>
        <Helmet><title>{ campus ? ('Edit Campus') : ('Add Campus')}</title></Helmet>

        {
          campus ? (
          <h1>Editing: {campus.name}</h1>
          ) : (
          <h1>Add new Campus</h1>
          )
        }
        <form style={{marginTop: '15px' }} onSubmit={ onSave }>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Name</label>
              <input
                className="form-control"
                value={ name }
                onChange={ onChange }
                name="name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Description</label>
              <textarea
                className="form-control"
                value={ description }
                onChange={ onChange }
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
              onChange={ onChange }
              name="street"
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-7">
              <label>City</label>
              <input
                className="form-control"
                value={ city }
                onChange={ onChange }
                name="city"
              />
            </div>

            <div className="form-group col-md-2">
              <label>State</label>
              <select
                className="form-control"
                value={ state }
                onChange={ onChange }
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
                value={ zip }
                onChange={ onChange }
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
      </div>
    )
  }
}

const mapState = ({ campuses, students }, { id, campus }) => {
  const newCampus = campus || campuses.find(campus => campus.id === id)
  const campus_students = students.find(s => s.campus_id === id)
  return { campus, campus_students }
}

const mapDispatch = (dispatch) => {
  return {
    saveCampus: (campus) => dispatch(saveCampusOnServer(campus))
  }
}

export default connect(mapState, mapDispatch)(CampusForm);
