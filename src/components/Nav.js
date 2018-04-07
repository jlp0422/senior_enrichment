/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const url = location.hash.slice(1)
  window.scrollTo(0, 0)
  return (
    <div className="navbar-light bg-light sticky-top">
      <div className="wrapper center-all">
        <nav style={{ marginBottom: '15px'}} className="navbar">
          <Link className="navbar-brand" to='/'>
            <img className="d-inline-block align-center" style={{ width: '30px'}} src="../../vendor/images/logo-black-no-bkg.png" />
            &nbsp;Home
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
    </div>
  )
}

export default Nav;
