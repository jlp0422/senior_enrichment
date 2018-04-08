/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div style={{justifyContent: 'space-between'}} className="flex space-between center wrapper center-all">
        <div className="footer-text"><p>Made by Jeremy Philipson</p></div>
        <Link to='/infinityandbeyond'><img className="footer-image" src="./vendor/images/logo-black-no-bkg.png" /></Link>
        <div className="footer-text"><p>For Fullstack Academy</p></div>
      </div>
    </div>
  )
}

export default Footer;
