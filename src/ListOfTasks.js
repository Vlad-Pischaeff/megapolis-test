import React, { useContext } from 'react'
import {Context} from './context'

export default function ListOfTasks({tasks, URL}) {
  const {dispatchTasks} = useContext(Context)
  let listitems = <li></li>

  const h_BtnEdit_onClick = (id) => {
    console.log('edit', id)
  }

  const h_BtnDelete_onClick = (id) => {
    fetch(`${URL}/list/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        console.log('Deleted...')
        fetch(`${URL}/list`)
          .then(res => res.json())
          .then(res => {
              console.log('Get list of tasks...')
              dispatchTasks({
                type: 'GET_TASKS',
                payload: res.data
              })
            }
          )
      } else {
        return res.error
      }
    })
  }

  if ((tasks.length !== 0)) {
    listitems = tasks.map((n, i) => {
      return (

          <li key={i} >
            <div className="num">{n.id}</div>
            <div className="text">{n.title}</div>
            <div className="edit">
              <i className="small material-icons green-btn" onClick={() => h_BtnEdit_onClick(n.id)}>edit</i>
              <i className="small material-icons red-btn" onClick={() => h_BtnDelete_onClick(n.id)}>delete</i>
            </div>
          </li>

      )
    })
  }

  return (
    <>
      {listitems}
    </>
  )
}