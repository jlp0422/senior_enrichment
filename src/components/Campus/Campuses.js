/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusCard from './CampusCard';
import { Helmet } from 'react-helmet';

class Campuses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    const name = ev.target.value
    this.setState({name})
  }

  render() {
    const { students, campuses } = this.props
    const { name } = this.state
    const { onChange } = this
    const matching = campuses.reduce((memo, campus) => {
      if (campus.name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(campus)
      }
      return memo
    }, [])
    return (
      <div className="default-margins">
        <Helmet><title>All Campuses</title></Helmet>

        <div className="flex space-btw center margin-bot-20 campus-bar">
          <div>
            <h1>All Campuses</h1>
          </div>
          <div>
            <input
              placeholder="Search for a campus"
              className="form-control"
              value={ name }
              onChange={ onChange }
            />
          </div>
          <div>
            <Link className="btn-pad" to='/campuses/create'>
              <button className="btn btn-primary btn-block-bar">Add Campus</button>
            </Link>
          </div>
        </div>
      {
        campuses.length ? (
          <div>
            {
              campuses &&
                matching.map(campus => (
                  <CampusCard key={campus.id} campus={campus} studentCount={students.filter(student => student.campus_id === campus.id).length} />
                ))
            }
          </div>
        ) : (
          <div className="margin-top-20 text-center">
          <h2 className="pad-bot-20">We don't have any campuses.</h2>
            <Link to='/campuses/create'>
              <button className="btn btn-primary">Add Campus</button>
            </Link>
          </div>
        )
      }
      {
        !matching.length && name && campuses.length ? (
          <div className="margin-top-20 text-center">
            <h2 className="pad-bot-20">No campuses match that search.</h2>
            <Link to='/campuses/create'>
              <button className="btn btn-primary">Add Campus</button>
            </Link>
          </div>
        ) : (
          null
        )
      }
      </div>
    )
  }
}

const mapState = ({ students, campuses }) => {
  return { campuses, students }
}

export default connect(mapState)(Campuses);
