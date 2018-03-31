/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import { deleteCampusOnServer } from '../store/campuses';

const CampusInfo = ({ campus, campus_students, deleteCampus }) => {
  if (!campus) return null
  return (
    <div style={{marginBottom: '40px'}}>
      <div style={{backgroundColor: '#f0f3f8', padding: '15px 10px 30px', borderRadius: '5px'}}>

        <div style={{ display: 'flex', paddingBottom: '15px'}}>
          <div style={{ flex: '1 250px', margin: '0px 5px 0px 0px'}}>
            <img style={{ borderRadius: '5px', width: '100%'}} src={campus.image_url} />
          </div>
          <div style={{ margin: '0px 10px', flex: '2 250px' }}>
            <h2>{campus.name}</h2>
            <h4>Address</h4>
            <h5>{campus.street}<br/>{campus.city_state_zip}</h5>
          </div>
        </div>

        <p>{campus.description}</p>

        <Link to={`/campuses/${campus.id}/edit`}>
          <button className="btn btn-outline-success">Edit {campus.name}</button>
        </Link>&nbsp;&nbsp;
            <button className="btn btn-outline-danger" onClick={() => deleteCampus(`${campus.id}`)}>Delete {campus.name}</button>
        </div>
      <h2>Students on campus</h2>
      <Link to={`/campuses/${campus.id}/students`}>
        <button className="btn btn-outline-primary">Add Students</button>
      </Link>
      <div className="card-group">
        {
          campus_students ?
          campus_students.map(student => (
            <StudentCard key={student.id} student={student} campus={ campus }/>
          )) :
          <h4>No students on this campus</h4>
        }
      </div>
    </div>
  )
}

const mapState = ({students, campuses}, { id }) => {
  const campus = campuses && campuses.find( campus => campus.id === id)
  const campus_students = students && students.filter(student => student.campus_id === id)
  return { campus, campus_students }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusOnServer(id))
  }
}

export default connect(mapState, mapDispatch)(CampusInfo);
