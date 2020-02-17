import React, {useState, useEffect, useReducer} from 'react'
import {Context} from './context'
import ListOfTasks from './ListOfTasks'
import tasksReducer from './reducer1'
import pagesReducer from './reducer2'
const URL="https://test.megapolis-it.ru/api"
let description = ''

export default function App() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [])
  const [pages, dispatchPages] = useReducer(pagesReducer, {main: '', create: 'hide', edit: 'hide'})

  useEffect(() => {
    fetch(`${URL}/list`)
      .then(res => res.json())
      .then(res => 
        // setTasks(res.data)
        dispatchTasks({
          type: 'GET_TASKS',
          payload: res.data
        })
      )
  }, [])

  const h_BtnAdd_onClick = () => {
    dispatchPages({ type: 'SHOW_CREATE' })
  }

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
          // setTasks([...tasks, {id: res.id, title: description}])
      })
  }

  const h_BtnClose_onClick = () => {
    dispatchPages({ type: 'HIDE_CREATE' })
  }

  console.log( 'tasks', tasks, pages)
  
  return (
    <Context.Provider value={{dispatchTasks}}>
      <div className="wrap">
        <header>
          <h3>Список задач</h3>
          <button className="btn-add" onClick = {h_BtnAdd_onClick}>Добавить</button>
          <button className="btn-del">
            <div className="btn-del-inside">
              <span>Удалить</span>
              <i className="small material-icons ">delete</i>
            </div>
          </button>
        </header>
      
        <main>
          <ul className="task-show-wrap">
            <ListOfTasks tasks={tasks} URL={URL} />
          </ul>
          <div className="task-edit-wrap">
            <div className="task-edit">
              <label>Краткое описание</label>
              <input type="text"></input>
              <button className="create">Вернуться к списку</button>
            </div>
          </div>
        </main>
      </div>

      <footer>(c) 2019 ОАО "Мегаполис"</footer>
      
      <div className={`modal ${pages.create}`} >
        <div className="bg" ></div>
        <div className="form">
          <i className="small material-icons red-btn close" onClick={h_BtnClose_onClick}>close</i>
          <label>Краткое описание</label>
          <input type="text" onChange={h_Input_OnChange}></input>
          <button className="create" onClick={h_BtnCreate_onClick}>Создать</button>
        </div>
      </div>
    </Context.Provider>
  );
}

