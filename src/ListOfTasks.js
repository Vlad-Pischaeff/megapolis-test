import React, { useContext } from 'react'
import {Context} from './context'

export default function ListOfTasks({tasks, task, input, delItem}) {
  const {dispatchPages} = useContext(Context)
  let listitems = <li></li>

  const showEditWindow = () => {
    dispatchPages({ type: 'SHOW_EDIT' })
  }

  const h_BtnEdit_onClick = (id, title) => {
    task.id = id
    task.title = title
    showEditWindow()
    input.current.value = title
  }

  if ((tasks.length !== 0)) {
    listitems = tasks.map((n, i) => {
      return (
        <li key={i} >
          <div className="num">{n.id}</div>
          <div className="text">{n.title}</div>
          <div className="edit">
            <i className="small material-icons green-btn" onClick={() => h_BtnEdit_onClick(n.id, n.title)}>edit</i>
            <i className="small material-icons red-btn" onClick={() => delItem(n.id)}>delete</i>
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