import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DisplayNames from '../DisplayNames/DisplayNames.js'
import { useStyles } from '../Session/style.js';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import { initializeApp, db, app } from "../Firebase/initFirebase.js";

export function PointButtons (props) {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [point, setPoint] = useState(null)
  const [clear, setClear] = useState(false)
  const name = props.name

  function updateDB() {
    const db = getDatabase()
    const info = {
      name,
      point
    }
    const updates = {}
    updates["sessions/" + props.sessionId + '/' + props.userId] = info
    update(ref(db), updates)
  }

  const getButtonsUsingMap = () => {
    const buttonValues = [0.5,1,2,3,5,8,13,20,'?']
    const buttons = []
    buttonValues.map((buttonValue) => {
      buttons.push(<Button key={buttonValue} style={props.mode ? { borderColor: '#6fee86', color: '#6fee86' } : { borderColor: '#4b216e', color: '#4b216e' }} className={classes.points}
        onClick={event => setPoint(buttonValue)}>{buttonValue}</Button>)
    })
    if (!show) {
      buttons.push(<Button key="show" style={props.mode ? { borderColor: '#6fee86', color: '#6fee86' } : { borderColor: '#4b216e', color: '#4b216e' }} className={classes.points}
        onClick={event => [setClear(false), setShow(true)]}>Show Results</Button>)
    }
    else {
      buttons.push(<Button key="clear"style={props.mode ? { borderColor: '#6fee86', color: '#6fee86' } : { borderColor: '#4b216e', color: '#4b216e' }} className={classes.points}
        onClick={event => [setClear(true), setShow(false)]}>Clear Results</Button>)
    }
    updateDB()
    return buttons
  }

  return (
    <div style={{ fontFamily: 'Kdam Thmor Pro,sans-serif' }}>
      <DisplayNames sessionId={props.sessionId} show={setShow} name={props.name} clear={clear} userId={props.userId} mode={props.mode}/>
      <div className={classes.pointsGroup}>
        <ButtonGroup size="large" aria-label="large outlined button group">
          {getButtonsUsingMap()}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default PointButtons;
