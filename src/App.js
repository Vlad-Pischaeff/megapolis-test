import React, {useEffect, useReducer} from 'react'
import {Context} from './context'
import ListOfTasks from './ListOfTasks'
import ModalCreateTask from './ModalCreateTask'
import tasksReducer from './reducer1'
import pagesReducer from './reducer2'
const URL="https://test.megapolis-it.ru/api"

export default function App() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [])
  const [pages, dispatchPages] = useReducer(pagesReducer, {main: '', create: 'hide', edit: 'hide'})

  useEffect(() => {
    fetch(`${URL}/list`)
      .then(res => res.json())
      .then(res => 
        dispatchTasks({
          type: 'GET_TASKS',
          payload: res.data
        })
      )
  }, [])

  const h_BtnAdd_onClick = () => {
    dispatchPages({ type: 'SHOW_CREATE' })
  }

  console.log( 'tasks', tasks, pages)
  
  return (
    <Context.Provider value={{dispatchTasks, dispatchPages}}>
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

      <ModalCreateTask pages={pages} URL={URL} />
      
     </Context.Provider>
  );
}

