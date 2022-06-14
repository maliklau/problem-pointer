import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../favicon-32x32.png'
import getStyles from '../HomePage/style.js'

export function Header () {
  const classes = getStyles("dark");

  return (
    <Link to="/">
      <div>
        <h1 className={classes.h1}>Problem
          <img src={logoImage} alt="point"/>
        Pointer</h1>
      </div>
    </Link>
  )
}

export default Header;
