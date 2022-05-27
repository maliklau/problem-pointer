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
    display: 'inline'
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
  results: {
    color: primary,
    borderColor: primary,
    borderWidth: 1
  },
  new: {
    background: primary,
    width: '18%',
    marginBottom: 25,
  },
  linkButton: {
    display: 0,
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
  const [sessionId, setSessionId] = useState(window.location.pathname.split('/')[4])
  const [initialState, setInitial] = useState(true)

  function handlePointClick (name=name, point='') {
    const db = getDatabase()
    const info = {
      name,
      point
    }
    const updates = {}
    updates['sessions/' + sessionId + '/' + userId] = info

    update(ref(db), updates)
    getSession(sessionId)
  }

  function clearPoints (users) {
    users.map(user => (
      handlePointClick(user[0],"")
    ))
  }

  function updateDB (name, point) {
    const db = getDatabase()
    const usersListRef = ref(db, 'sessions/' + sessionId)
    const newUserRef = push(usersListRef)
    setUserId(newUserRef.key)
    set(newUserRef, {
      name,
      point
    })
  }

  function checkUser(userPoint, total, submittedPoints, modeList) {
    var submitted = 0
    if(userPoint === '') {
      submitted = submittedPoints - 1
      return [total, submitted, modeList]
    } else {
      modeList = modeList[userPoint] + 1
      return [total + userPoint, submittedPoints, modeList]
    }
  }

  function getCalculations(users) {
    var modeList = [0,0,0,0,0,0,0,0,0]
    var totalList = []
    var mode = 0
    var mean = 0
    var total = 0
    var submittedPoints = users.length

    users.map(user => (
      totalList = checkUser(user[1],total, submittedPoints, modeList),
      total = totalList[0],
      submittedPoints = totalList[1],
      modeList = totalList[2]
    ))
    return (
      <div className={classes.results}>
        <p>Mean: 4.33</p>
        <p>Mode: 3</p>
      </div>
    )
  }

  function setSession (sessionId) {
    const db = getDatabase()
    const dbRef = ref(db, 'sessions/' +sessionId)
  }

  function printUsers(users) {
    return (
      <div className={classes.users}>
        {users.map(user => (
          <p>{user[0]}{user[1]}</p>
        ))}
      </div>
    )
  }

  function currentUser(userName, userPoint) {
    if(userName === name) {
      return (
        <div>
          <p>{userName}{userPoint}</p>
        </div>
      )
    } else {
        return (
          <div>
            <p>{userName}</p>
          </div>
        )
    }
  }

  function printUsersNoShow(users) {
    return (
      <div className={classes.users}>
        {users.map(user => (
          <p>{user[0]}</p>
        ))}
      </div>
    )
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
          {show &&
            <div>
              {printUsers(users)}
              {getCalculations(users)}
            </div>
          }
          {!show &&
            printUsersNoShow(users)
          }
        {printButtons(users)}
      </div>
    )
  }

  function printButtons (users) {
      return (
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
            {show &&
              <Button className={classes.points} onClick={event => [setShow(false), clearPoints(users)]}>Clear Results</Button>
            }
          </ButtonGroup>
        </div>
      )
  }

  function copy () {
    const el = document.createElement("input");
    el.value = window.location.pathname;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

    return (
      <div>
        <Link to="/" onClick={ event => [setUserId(''), setSessionId(''), setName(''), setPoint(''), setShow(false)]}>
          <h1>Problem Pointer</h1>
        </Link>
        <h2 className={classes.linkIcon}>Session - {window.location.pathname.split('/')[4]}</h2>
        <Button className={classes.linkButton}>
          <LinkIcon className={classes.linkIcon} onClick={event => copy()}/>
        </Button>
        {!nameSubmitted &&
          <form className={classes.root} autoComplete="off" onSubmit={(event) => [
            setNameSubmit(true),
            setSessionId(window.location.pathname.split('/')[4]),
            updateDB(name,'')]}>
            <TextField InputProps={{className: classes.input}} value={name} onChange={event => setName(event.target.value)} id="standard-basic" label="Name"/>
          </form>
        }
        {getSession(sessionId)}
      </div>
    );
}

export default Session;
