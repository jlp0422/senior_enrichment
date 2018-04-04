/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const url = location.hash.slice(1)
  window.scrollTo(0, 0)
  return (
    <div>
      <nav style={{ marginBottom: '15px'}} className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to='/'>
          <img className="d-inline-block align-top" style={{ width: '30px'}} src="../../vendor/images/logo-black-no-bkg.png" />&nbsp;
          Home
        </Link>

        <ul className="nav">
          {
            url === '/campuses' ? (
              <span className="nav-item" style={{ borderBottom: '2px solid black', margin: '0px 5px' }}>Campuses</span>
            ) : (
                <li className="nav-item" style={{ margin: '0px 5px' }}>
                <Link to='/campuses' style={{ color: 'black'}}>Campuses</Link>
              </li>
            )
          }
          {
            url === '/students' ? (
              <span className="nav-item" style={{ borderBottom: '2px solid black', margin: '0px 5px'}}>Students</span>
            ) : (
                <li className="nav-item" style={{ margin: '0px 5px' }}>
                <Link to='/students' style={{ color: 'black'}}>Students</Link>
              </li>
            )
          }
        </ul>
      </nav>
    </div>
  )
}

export default Nav;
