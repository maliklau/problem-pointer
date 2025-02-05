import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LinkIcon from '@material-ui/icons/Link';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Session from '../Session/Session';
import { styled } from '@mui/material/styles'
import { initializeApp, db, app } from "../Firebase/initFirebase.js";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import useStyles from './style.js'
import Header from '../Header/Header'

const dark = '#6fee86'
const light = '#4b216e'

export function HomePage (props) {
  let darkMode = false

  if (props.mode === 'dark') {
    darkMode = true
  }

  const textFieldStyles = makeStyles({
    root: {
      '& label.Mui-focused': {
        color: darkMode ? dark : light,
        fontFamily: 'Kdam Thmor Pro,sans-serif',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: darkMode ? dark : light,
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: darkMode ? dark : light,
      },
      '& label': {
        color: darkMode ? dark : light,
        fontFamily: 'Kdam Thmor Pro,sans-serif',
      },
      '& .MuiButtonGroup-root': {
        borderColor: darkMode ? dark : light,
        color: darkMode ? dark : light
      },
      '& .MuiInputBase-root': {
        fontFamily: 'Kdam Thmor Pro,sans-serif',
      },
    },
    input: {
      color: darkMode ? dark : light,
    }
  });

  const textClasses = textFieldStyles()
  const [sessionId, setSessionId] = useState('')
  const [sessionExists, setSessionExists] = useState('')
  const random = Math.floor(Math.random() * 10000) + 1
  const classes = useStyles();

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
      <Header mode={darkMode}/>
      <div>
        <Link to={"/session/"+random}>
          <Button variant="contained" className={darkMode ? classes.sessionButtonsDark : classes.sessionButtons} onClick={event => [setSession(random)]}>New Session</Button>
        </Link>
        <form className={textClasses.root} autoComplete="off">
          <TextField
          InputProps={{className: textClasses.input}}
          value={sessionId}
          onChange={event => [setSessionId(event.target.value), checkSession(event.target.value)]}
          error={sessionExists === false}
          helperText={sessionExists === false ? "This session doesn't exist." : ' '}
          id="standard-basic" label="Session ID"/>
        </form>
        {sessionExists &&
          <Link to={"/session/"+ sessionId}>
            <Button variant="contained" className={darkMode ? classes.sessionButtonsDark : classes.sessionButtons}>Join Existing</Button>
          </Link>
        }
        {!sessionExists &&
          <Link to={"/"}>
            <Button variant="contained" className={darkMode ? classes.sessionButtonsDark : classes.sessionButtons}>Join Existing</Button>
          </Link>
        }
      </div>
    </div>
  );
}

export default HomePage;
