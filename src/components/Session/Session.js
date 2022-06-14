import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import HomePage from '../HomePage/HomePage'
import Divider from '@material-ui/core/Divider';
import Picker from 'emoji-picker-react';
import logoImage from '../../favicon-32x32.png'
import Box from '@mui/material/Box';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { initializeApp, db, app } from "../Firebase/initFirebase.js";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import getStyles from './style.js';
import Header from '../Header/Header';
import PointButtons from '../PointButtons/PointButtons';

const primary = '#6fee86';
var total = 0;
var mean = 0;

export function Session (props) {
  const classes = getStyles()
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [nameSubmitted, setNameSubmit] = useState(false)
  const [point, setPoint] = useState('')
  const [show, setShow] = useState(false)
  const [users, setUsers] = useState([])
  const [sessionId, setSessionId] = useState(window.location.pathname.split('/')[2])
  const [initialState, setInitial] = useState(true)
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [displayEmojis, setDisplayEmojis] = useState(null)
  //
  // function clearPoints (users) {
  //   users.map(user => (
  //     handlePointClick(user[0],"")
  //   ))
  // }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setName(name + emojiObject.emoji)
  };

  function updateDB (name) {
    const db = getDatabase()
    const usersListRef = ref(db, "sessions/" + sessionId)
    const newUserRef = push(usersListRef)
    setUserId(newUserRef.key)
    set(newUserRef, {
      name
    })
  }

  // function getCalculations(users) {
  //   var modeList = [0,0,0,0,0,0,0,0,0]
  //   var totalList = []
  //   var mode = 0
  //   var mean = 0
  //   var total = 0
  //   var submittedPoints = users.length
  //
  //   users.map(user => (
  //     totalList = checkUser(user[1],total, submittedPoints, modeList),
  //     total = totalList[0],
  //     submittedPoints = totalList[1],
  //     modeList = totalList[2]
  //   ))
  //   return (
  //     <div className={classes.results}>
  //       <p>Mean: 4.33</p>
  //       <p>Mode: 3</p>
  //     </div>
  //   )
  // }

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
    const dbRef = ref(db, sessionId)
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
        <div>
          {printUsers(users)}
        </div>
        {!show &&
          printUsersNoShow(users)
        }
      </div>
    )
  }

  function copy () {
    const el = document.createElement("input");
    el.value = "https://problem-pointer.web.app" + window.location.pathname;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

    return (
      <div>
        <Header/>
        <h2 className={classes.linkIcon}>Session - {window.location.pathname.split('/')[2]}</h2>
        <Button className={classes.linkButton}>
          <LinkIcon className={classes.linkIcon} onClick={event => copy()}/>
        </Button>
        {!nameSubmitted &&
          <div>
            <form className={classes.root} autoComplete="off" onSubmit={(event) => [
              setNameSubmit(true),
              setSessionId(window.location.pathname.split('/')[2]),
              updateDB(name)]}>
              <TextField InputProps={{className: classes.input}} value={name} onChange={event => setName(event.target.value)} id="standard-basic" label="Name"/>
              <Button onClick={event => setDisplayEmojis(true)}>
                <InsertEmoticonIcon sx={{ color: primary }}/>
              </Button>
            </form>
            {displayEmojis &&
              <Picker onEmojiClick={onEmojiClick} />
            }
          </div>
        }
        {nameSubmitted &&
          getSession()
        }
        {nameSubmitted &&
          <div>
            <PointButtons userId={ userId } sessionId={ sessionId } name={ name }/>
          </div>
        }
      </div>
    );
}

export default Session;
