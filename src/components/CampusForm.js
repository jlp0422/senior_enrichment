/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCampusOnServer } from '../store/campuses';

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
    const { campus } = this.props
    const { name, description, street, city, state, zip, image_url } = this.state
    const { onChange, onSave } = this
    const match = campus && campus.name === name && campus.description === description && campus.street === street && campus.city === city && campus.state === state && campus.zip === zip && campus.image_url === image_url ? true : false

    const states = [{ id: 1, abbrev: 'AL' }, { id: 2, abbrev: 'AK' }, { id: 3, abbrev: 'AZ' }, { id: 4, abbrev: 'AR' }, { id: 5, abbrev: 'CA' }, { id: 6, abbrev: 'CO' }, { id: 7, abbrev: 'CT' }, { id: 8, abbrev: 'DE' }, { id: 9, abbrev: 'FL' }, { id: 10, abbrev: 'GA' }, { id: 11, abbrev: 'HI' }, { id: 12, abbrev: 'ID' }, { id: 13, abbrev: 'IL' }, { id: 14, abbrev: 'IN' }, { id: 15, abbrev: 'IA' }, { id: 16, abbrev: 'KS' }, { id: 17, abbrev: 'KY' }, { id: 18, abbrev: 'LA' }, { id: 19, abbrev: 'ME' }, { id: 20, abbrev: 'MD' }, { id: 21, abbrev: 'MA' }, { id: 22, abbrev: 'MI' }, { id: 23, abbrev: 'MN' }, { id: 24, abbrev: 'MS' }, { id: 25, abbrev: 'MO' }, { id: 26, abbrev: 'MT' }, { id: 27, abbrev: 'NE' }, { id: 28, abbrev: 'NV' }, { id: 29, abbrev: 'NH' }, { id: 30, abbrev: 'NJ' }, { id: 31, abbrev: 'NM' }, { id: 32, abbrev: 'NY' }, { id: 33, abbrev: 'NC' }, { id: 34, abbrev: 'ND' }, { id: 35, abbrev: 'OH' }, { id: 36, abbrev: 'OK' }, { id: 37, abbrev: 'OR' }, { id: 38, abbrev: 'PA' }, { id: 39, abbrev: 'RI' }, { id: 40, abbrev: 'SC' }, { id: 41, abbrev: 'SD' }, { id: 42, abbrev: 'TN' }, { id: 43, abbrev: 'TX' }, { id: 44, abbrev: 'UT' }, { id: 45, abbrev: 'VT' }, { id: 46, abbrev: 'VA' }, { id: 47, abbrev: 'WA' }, { id: 48, abbrev: 'WV' }, { id: 49, abbrev: 'WI' }, { id: 50, abbrev: 'WY' }]

    // if (!campus) return null
    return (
      <div style={{ marginBottom: '40px' }}>
        {
          campus ? (
          <h2>Editing: {campus.name}</h2>
          ) : (
          <h2>Create new Campus</h2>
          )
        }
        <form onSubmit={ onSave }>
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
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                className="form-control"
                value={ city }
                onChange={ onChange }
                name="city"
              />
            </div>
            <div className="form-group col-md-3">
              <label>State</label>
              <select
                className="form-control"
                value={ state}
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

const mapState = ({ campuses, students }, { id }) => {
  const campus = campuses.find(campus => campus.id === id)
  const campus_students = students.find(s => s.campus_id === id)
  return { campus, campus_students }
}

const mapDispatch = (dispatch) => {
  return {
    saveCampus: (campus) => dispatch(saveCampusOnServer(campus))
  }
}

export default connect(mapState, mapDispatch)(CampusForm);
