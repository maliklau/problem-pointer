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

const primary = '#6fee86';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primary,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: primary,
    },
    '& label': {
      color: primary,
    },
  },
  input: {
    color: primary,
  },
  linkIcon: {
    color: primary,
    display: 'inline',
  },
  points: {
    color: primary,
    borderColor: primary,
  },
  pointsGroup: {
    padding: '20px',
  },
  divider: {
    backgroundColor: primary,
    width: '100%',
    maxWidth: 500,
    marginTop: 25,
    marginBottom: 25,
    margin: 'auto',
  },
  users: {
    color: primary,
  },
  new: {
    background: primary,
    width: '18%',
    marginBottom: 25,
  },
  join: {
    background: primary,
    width: '9%',
    marginTop: 20,
  },
});

export function HomePage (InputProps) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [nameSubmitted, setNameSubmit] = useState(false)
  const [point, setPoint] = useState('')
  const [show, setShow] = useState(false)
  const [users, setUsers] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [initialState, setInitial] = useState(true)
  const [sessionExists, setSessionExists] = useState('')

  function setSession (sessionId) {
    const db = getDatabase()
    const dbRef = ref(db, 'sessions/' +sessionId)
  }

  function checkSession (sessionId) {
    const dbRef = ref(getDatabase());
    console.log(sessionId)
    get(child(dbRef, `sessions/` + sessionId)).then((snapshot) => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        setSessionExists(true)
      } else {
        console.log("No data available");
        setSessionExists(false)
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <Link to="/lauren-malik/lauren-malik.github.io" onClick={event => [setUserId(''), setSessionId(''), setName(''), setPoint(''), setNameSubmit(false), setShow(false)]}>
        <h1>Problem Pointer</h1>
      </Link>
        <div>
          <Link to={"/lauren-malik/lauren-malik.github.io/session/"+(Math.floor(Math.random() * 10000) + 1)}>
            <Button variant="contained" className={classes.new}>New Session</Button>
          </Link>
          <form className={classes.root} autoComplete="off">
            <TextField InputProps={{className: classes.input}} value={sessionId}
            onChange={event => [setSessionId(event.target.value), checkSession(event.target.value)]}
            error={sessionExists === false}
            helperText={sessionExists === false ? "This session doesn't exist." : ' '}
            id="standard-basic" label="Session ID"/>
          </form>
          {sessionExists &&
            <Link to={"/lauren-malik/lauren-malik.github.io/session/"+sessionId}>
              <Button variant="contained" className={classes.join} onClick={event => [setSessionId(sessionId)]}>Join Existing</Button>
            </Link>
          }
          {!sessionExists &&
            <Link to={"/lauren-malik/lauren-malik.github.io/"}>
              <Button variant="contained" className={classes.join}>Join Existing</Button>
            </Link>
          }
        </div>
    </div>
  );
}

export default HomePage;
