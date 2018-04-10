/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const url = location.hash.slice(1)
  window.scrollTo(0, 0)
  return (
    <div className="navbar-light bg-light sticky-top">
      <div className="wrapper center-all">
        <nav className="navbar margin-bot-10">
          <Link className="navbar-brand" to='/home'>
            <img className="d-inline-block align-center nav-logo" src="../../vendor/images/logo-black-no-bkg.png" />
            &nbsp;Home
          </Link>

          <ul className="nav">
            {
              url === '/campuses' ? (
                <span className="nav-item nav-word-selected">Campuses</span>
              ) : (
                <li className="nav-item">
                  <Link className="nav-word-link" to='/campuses'>Campuses</Link>
                </li>
              )
            }
            {
              url === '/students' ? (
                <span className="nav-item nav-word-selected">Students</span>
              ) : (
                <li className="nav-item">
                  <Link className="nav-word-link" to='/students'>Students</Link>
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
