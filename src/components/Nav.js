import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img className="d-inline-block align-top" style={{ width: '30px'}} src="../../vendor/images/logo_black.jpg" />&nbsp;
          Home
        </a>

      <ul className="nav">
        <li className="nav-item">
          <Link to='/campuses'>Campuses</Link>
        </li>
          &nbsp;&nbsp;
        <li className="nav-item">
          <Link to='/students'>Students</Link>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default Nav;
