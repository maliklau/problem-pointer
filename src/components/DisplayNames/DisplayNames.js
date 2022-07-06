import React, { useState } from 'react';
import { getDatabase, ref, set, child, get, push, onValue, update } from "firebase/database";

export default function DisplayNames(props){

  function printUsers(users) {
    let usersString = ''
    return (
      <div>
        {props.show &&
          users.map(user => (
            <span style={props.mode ? { color: '#6fee86' } : { color: '#4b216e' }}>{user[0] + ' ' + user[1]}<br/></span>
          ))
        }
        {!props.show &&
          <span style={props.mode ? { color: '#6fee86' } : { color: '#4b216e' }}>{props.name + ' ' + props.point}<br/></span>
        }
      </div>
    )
  }

  // function currentUser(userName, userPoint) {
  //   if(userName === name) {
  //     return (
  //       <div>
  //         <p>{userName}{userPoint}</p>
  //       </div>
  //     )
  //   } else {
  //       return (
  //         <div>
  //           <p>{userName}</p>
  //         </div>
  //       )
  //   }
  // }

  function getSession (sessionId) {
    const db = getDatabase()
    const dbRef = ref(db, "sessions/" + props.sessionId)
    const users = []
    const name = props.name
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if(childData.point == undefined) {
          users.push([childData.name, ""])
        } else {
          users.push([childData.name, childData.point])
        }
        const nameEach = childData.name
        if(props.clear) {
          const clearPoint = ''
          const info = {
            nameEach,
            clearPoint
            }
          const updates = {}
          updates["sessions/" + props.sessionId + '/' + childKey] = info
          update(ref(db), updates)
        }
      });
      users.pop()
    });
    return (
      <div>
        {printUsers(users)}
      </div>
    )
  }

  return (
    <div>
      {getSession()}
    </div>
  )

}
