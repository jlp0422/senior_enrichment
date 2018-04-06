/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from '../Student/StudentCard';
import { deleteCampusOnServer } from '../../store/campuses';
import { Helmet } from 'react-helmet';

const CampusInfo = ({ campus, campus_students, deleteCampus }) => {
  if (!campus) return null
  return (
    <div className="default-margins">
      <Helmet><title>Campus Info</title></Helmet>
      <div className="border-5-20 margin-lr-10" style={{backgroundColor: '#f0f3f8', padding: '10px 10px 30px' }}>

        <div className="flex pad-bot-20">
          <div style={{ flex: '1 250px', margin: '0px 10px 0px 0px'}}>
            <img className="border-5-20" style={{ width: '100%'}} src={campus.image_url} />
          </div>
          <div className="margin-lr-10" style={{ flex: '2 250px' }}>
            <h2>{campus.name}</h2>

            {
              campus.street ? (
                <div>
                  <h4>Address</h4>
                  <h5>{campus.street}<br />{campus.city_state_zip}</h5>
                  <p>{campus.description}</p>
                </div>
              ) : (
                <h4>No address information</h4>
              )
            }

          </div>
        </div>


        <div className="flex" style={{ justifyContent: 'flex-start' }}>
          <div>
            <Link style={{marginRight: '20px'}} to={`/campuses/${campus.id}/edit`}>
              <button className="btn btn-outline-success">Edit {campus.name}</button>
            </Link>
          </div>
          <div>
            <button className="btn btn-outline-danger" onClick={() => deleteCampus(`${campus.id}`)}>Delete {campus.name}</button>
          </div>
        </div>
      </div>
      <div className="flex space-btw margin-10">
        <div><h2>Students on campus</h2></div>
        <div>
          <Link to={`/campuses/${campus.id}/students`}>
            <button className="btn btn-outline-primary">Add Students</button>
          </Link>
        </div>
      </div>
      <div className="card-group">
        {
          campus_students.length ?
          campus_students.map(student => (
            <StudentCard key={student.id} student={student} campus={ campus }/>
          )) :
          <div className="margin-lr-10">
            <h4>No students on this campus</h4>
          </div>
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
