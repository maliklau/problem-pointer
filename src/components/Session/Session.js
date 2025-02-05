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
import IconButton from '@mui/material/IconButton';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import useStyles from './style.js';
import Header from '../Header/Header';
import PointButtons from '../PointButtons/PointButtons';

var total = 0;
var mean = 0;

const dark = '#6fee86';
const light = '#4b216e';

export function Session (props) {
  const classes = useStyles(props.mode)

  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [nameSubmitted, setNameSubmit] = useState(false)
  const [sessionId, setSessionId] = useState(window.location.pathname.split('/')[2])
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [displayEmojis, setDisplayEmojis] = useState(null)

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
    },
    input: {
      color: darkMode ? dark : light,
      fontFamily: 'Kdam Thmor Pro,sans-serif',
    }
  });

  const textClasses = textFieldStyles()

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setName(name + emojiObject.emoji)
  };

  function displayEmojisOrNot() {
    if (displayEmojis) {
      setDisplayEmojis(false)
    } else {
      setDisplayEmojis(true)
    }
  }

  function updateDB (name) {
    const db = getDatabase()
    const usersListRef = ref(db, "sessions/" + sessionId)
    const newUserRef = push(usersListRef)
    setUserId(newUserRef.key)
    set(newUserRef, {
      name
    })
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
        <Header mode={darkMode}/>
        <h2 className={darkMode ? classes.linkIconDark : classes.linkIcon}>Session - {window.location.pathname.split('/')[2]}</h2>
        <IconButton style={{ display: '0', marginBottom: '0.3em', marginLeft: '0.3em' }}>
          <LinkIcon className={darkMode ? classes.linkIconDark : classes.linkIcon} onClick={event => copy()}/>
        </IconButton>
        {!nameSubmitted &&
          <div>
            <form className={textClasses.root} autoComplete="off" onSubmit={(event) => [
              setNameSubmit(true),
              setSessionId(window.location.pathname.split('/')[2]),
              updateDB(name)]}>
              <TextField
                InputProps={{className: textClasses.input}}
                value={name}
                onChange={event => setName(event.target.value)}
                id="standard-basic" label="Name"/>
              <IconButton onClick={event => displayEmojisOrNot()} style={{ marginTop: '0.5em' }}>
                <InsertEmoticonIcon className={darkMode ? classes.emotionIconDark : classes.emotionIcon}/>
              </IconButton>
            </form>
            {displayEmojis &&
              <Picker pickerStyle={{ display: 'inline-block', fontFamily: 'Kdam Thmor Pro,sans-serif' }} onEmojiClick={onEmojiClick} />
            }
          </div>
        }
        {nameSubmitted &&
          <div>
            <PointButtons userId={ userId } sessionId={ sessionId } name={ name } mode={darkMode}/>
          </div>
        }
      </div>
    );
}

export default Session;
