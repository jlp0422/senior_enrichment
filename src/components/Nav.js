/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const url = location.hash.slice(1)
  return (
    <div>
      <nav style={{ marginBottom: '15px'}} className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img className="d-inline-block align-top" style={{ width: '30px'}} src="../../vendor/images/logo_black.jpg" />&nbsp;
          Home
        </a>

      <ul className="nav">
        {
          url === '/campuses' ? (
            <span className="nav-item font-weight-bold" style={{ borderBottom: '2px solid black', margin: '0px 5px' }}>Campuses</span>
          ) : (
              <li className="nav-item" style={{ borderBottom: '2px solid transparent', margin: '0px 5px' }}>
              <Link to='/campuses'>Campuses</Link>
            </li>
          )
        }
        {
          url === '/students' ? (
            <span className="nav-item font-weight-bold" style={{ borderBottom: '2px solid black', margin: '0px 5px' }}>Students</span>
          ) : (
              <li className="nav-item" style={{ borderBottom: '2px solid transparent', margin: '0px 5px' }}>
              <Link to='/students'>Students</Link>
            </li>
          )
        }
      </ul>
      </nav>
    </div>
  )
}

export default Nav;
