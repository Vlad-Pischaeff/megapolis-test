import React, {useContext, useRef} from 'react'
import {Context} from './context'
// let description = ''

export default function ModalCreateTask({pages, URL, task}) {
  const {dispatchTasks, dispatchPages} = useContext(Context)
  const Input = useRef('')

  const h_Input_OnChange = (event) => {
    task.title = event.target.value
  }

  const h_BtnCreate_onClick = () => {
    let obj = {title: task.title}
    fetch(`${URL}/list`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if (res.success)
          dispatchTasks({
            type: 'SET_TASKS',
            payload: {id: res.id, title: task.title}
          })
          h_BtnClose_onClick()
          task.title = ''
          Input.current.value = ''
      })
  }

  const h_BtnClose_onClick = () => {
    dispatchPages({ type: 'HIDE_CREATE' })
  }

  return (
    <div className={`modal ${pages.create}`} >
      <div className="bg" ></div>
      <div className="form">
        <i className="small material-icons red-btn close" onClick={h_BtnClose_onClick}>close</i>
        <label>Краткое описание</label>
        <input type="text" onChange={h_Input_OnChange} ref={Input}></input>
        <button className="create" onClick={h_BtnCreate_onClick}>Создать</button>
      </div>
    </div>
  )
}