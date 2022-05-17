import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HomePage from '../HomePage/HomePage'
import Divider from '@material-ui/core/Divider';
import { initializeApp, db, app } from "../Firebase/initFirebase.js";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";

const primary = '#6fee86';
var total = 0;
var mean = 0;

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

export function Session (InputProps) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [nameSubmitted, setNameSubmit] = useState(false)
  const [point, setPoint] = useState('')
  const [show, setShow] = useState(false)
  const [users, setUsers] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [initialState, setInitial] = useState(true)

  function handlePointClick (name=name, point='') {
    console.log("point click")
    console.log(userId)
    const db = getDatabase()
    const info = {
      name,
      point
    }
    const updates = {}
    updates['sessions/' + sessionId + '/' + userId] = info

    update(ref(db), updates)
  }

  function updateDB (name, point) {
    const db = getDatabase()
    const usersListRef = set(ref(db, 'sessions/' + sessionId))
    const newUserRef = push(usersListRef)
    setUserId(newUserRef.key)
    set(newUserRef, {
      name,
      point
    })
  }

  function setSession (sessionId) {
    const db = getDatabase()
    set(ref(db, 'sessions/' + sessionId))
  }

  function getSession (sessionId) {
    const db = getDatabase()
    const dbRef = ref(db, 'sessions/' +sessionId)
    const users = []
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        users.push([childData.name, childData.point])
      });
    });
    return (
      <div>
        <div className={classes.users}>
          {users.map(user => (
            <p>{user[0]}{user[1]}</p>
          ))}
        </div>
        {printButtons()}
      </div>
    )
  }

  function printButtons (users, show) {
      return (
        <div>
          {nameSubmitted &&
            <div className={classes.pointsGroup}>
              <ButtonGroup size="large" aria-label="large outlined button group">
                <Button className={classes.points} onClick={event => handlePointClick(name, 0.5)}>.5</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 1)}>1</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 2)}>2</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 3)}>3</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 5)}>5</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 8)}>8</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 13)}>13</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, 20)}>20</Button>
                <Button className={classes.points} onClick={event => handlePointClick(name, '?')}>?</Button>
                {!show &&
                  <Button className={classes.points} onClick={event => setShow(true)}>Show Results</Button>
                }
              </ButtonGroup>
            </div>
          }
        </div>
      )
  }

  function copy () {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

    return (
      <div>
        <Link to="/lauren-malik/lauren-malik.github.io" onClick={event => [setUserId(''), setSessionId(''), setName(''), setPoint(''), setNameSubmit(false), setShow(false)]}>
          <h1>Problem Pointer</h1>
        </Link>
        <h3 className={classes.linkIcon}>Session - {window.location.pathname.split('/')[4]}</h3>
        <LinkIcon className={classes.linkIcon}/>
        {!nameSubmitted &&
          <form className={classes.root} autoComplete="off" onSubmit={(event) => [
            updateDB(name,''),
            getSession(window.location.pathname.split('/')[4]),
            setNameSubmit(true)]}>
            <TextField InputProps={{className: classes.input}} value={name} onChange={event => setName(event.target.value)} id="standard-basic" label="Name"/>
          </form>
        }
        {nameSubmitted &&
          <div>
            <Divider className={classes.divider}/>
            {show &&
              getSession(sessionId)
            }
            {!show &&
              getSession(sessionId)
            }
          </div>
        }
      </div>
    );
}

export default Session;
