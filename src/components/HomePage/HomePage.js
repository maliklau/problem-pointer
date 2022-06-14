import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Session from '../Session/Session';
import { initializeApp, db, app } from "../Firebase/initFirebase.js";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import getStyles from './style.js'
import Header from '../Header/Header'

const primary = '#6fee86';
const purple = '#931DAA';

export function HomePage (props) {
  const classes = getStyles("dark");
  const [sessionId, setSessionId] = useState('')
  const [sessionExists, setSessionExists] = useState('')
  const random = Math.floor(Math.random() * 10000) + 1

  function setSession (sessionId) {
    const time = (new Date().getMonth() + 1) + '/' +
    new Date().getFullYear().toString()
    
    const db = getDatabase()
    set(ref(db, 'sessions/' + sessionId), {
      timeStamp: time
    });
  }

  function checkSession (sessionId) {
    const db = getDatabase();
    const dbRef = ref(db, "sessions/" + sessionId.toString());
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setSessionExists(true)
      } else {
        setSessionExists(false)
      }
    });
  }

  return (
    <div>
      <Header/>
      <div>
        <Link to={"/session/"+random}>
          <Button variant="contained" className={classes.new} onClick={event => [setSession(random)]}>New Session</Button>
        </Link>
        <form className={classes.root} autoComplete="off">
          <TextField InputProps={{className: classes.input}} value={sessionId}
          onChange={event => [setSessionId(event.target.value), checkSession(event.target.value)]}
          error={sessionExists === false}
          helperText={sessionExists === false ? "This session doesn't exist." : ' '}
          id="standard-basic" label="Session ID"/>
        </form>
        {sessionExists &&
          <Link to={"/session/"+ sessionId}>
            <Button variant="contained" className={classes.join}>Join Existing</Button>
          </Link>
        }
        {!sessionExists &&
          <Link to={"/"}>
            <Button variant="contained" className={classes.join}>Join Existing</Button>
          </Link>
        }
      </div>
    </div>
  );
}

export default HomePage;
