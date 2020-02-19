import React, {useContext} from 'react'
import {Context} from './context'
let description = ''

export default function ModalCreateTask({pages, URL}) {
  const {dispatchTasks, dispatchPages} = useContext(Context)
  
  const h_Input_OnChange = (event) => {
    description = event.target.value
  }

  const h_BtnCreate_onClick = () => {
    let obj = {title: description}
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
            payload: {id: res.id, title: description}
          })
          h_BtnClose_onClick()
          description = ''
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
        <input type="text" onChange={h_Input_OnChange}></input>
        <button className="create" onClick={h_BtnCreate_onClick}>Создать</button>
      </div>
    </div>
  )
}