import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { getStyles } from '../Session/style.js';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";
import { initializeApp, db, app } from "../Firebase/initFirebase.js";

export function PointButtons (props) {
  const classes = getStyles()
  const [show, setShow] = useState(false)
  const [point, setPoint] = useState(null)
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
      buttons.push(<Button key={buttonValue} className={classes.points}
        onClick={event => setPoint(buttonValue)}>{buttonValue}</Button>)
    })
    if (!show) {
      buttons.push(<Button key="show" className={classes.points}
        onClick={event => setShow(true)}>Show Results</Button>)
    }
    //add clearPoints to the onClick event
    else {
      buttons.push(<Button key="clear" className={classes.points}
        onClick={event => setShow(false)}>Clear Results</Button>)
    }
    updateDB()
    return buttons
  }

  return (
    <div className={classes.pointsGroup}>
      <ButtonGroup size="large" aria-label="large outlined button group">
        {getButtonsUsingMap()}
      </ButtonGroup>
    </div>
  );
}

export default PointButtons;
