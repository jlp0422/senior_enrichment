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
    this.setState({name: ev.target.value})
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
    console.log(matching)
    return (
      <div style={{ margin: '0px 10px 60px' }}>
        <Helmet><title>All Campuses</title></Helmet>
        <div className="flex" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1>All Campuses</h1>
          </div>
          <div className="flex" style={{flexDirection: 'row'}}>
            <div>
              <h3>Search</h3>
            </div>
            <div>
              <input
                className="form-control"
                value={ name }
                onChange={ onChange }
              />
            </div>
          </div>
          <div>
            <Link to='/campuses/create'>
              <button className="btn btn-primary">Add Campus</button>
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
          <div style={{marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ paddingBottom: '20px'}}>We don't have any campuses.</h2>
            <Link to='/campuses/create'>
              <button className="btn btn-primary">Add Campus</button>
            </Link>
          </div>
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
