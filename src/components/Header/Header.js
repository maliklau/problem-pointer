import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logoImage from '../../favicon-32x32.png'
import useStyles from '../HomePage/style.js'

export function Header (props) {
  const classes = useStyles();

  return (
    <div>
      <Link to="/">
        <div>
          <h1 className={props.mode ? classes.h1Dark : classes.h1}>Problem
            <img src={logoImage} alt="point"/>
          Pointer</h1>
        </div>
      </Link>
    </div>
  )
}

export default Header;
