import React, {useEffect, useReducer, useRef} from 'react'
import {Context} from './context'
import ListOfTasks from './ListOfTasks'
import ModalCreateTask from './ModalCreateTask'
import tasksReducer from './reducer1'
import pagesReducer from './reducer2'
const URL="https://test.megapolis-it.ru/api"
const task = { id: '', title: ''}

export default function App() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [])
  const [pages, dispatchPages] = useReducer(pagesReducer, {main: '', create: 'hide', edit: 'hide'})
  const refInput = useRef('')

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

  const h_BtnCreate_onClick = () => {
    let obj = {title: task.title}
    fetch(`${URL}/list/${task.id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json())
    .then(res => {
        console.log('edited task title ...', res)
        if (res.success)
          fetch(`${URL}/list`)
          .then(res => res.json())
          .then(res => 
            dispatchTasks({
              type: 'GET_TASKS',
              payload: res.data
            })
          )
          dispatchPages({ type: 'HIDE_EDIT' })
      })
  }

  const h_Input2_onChange = (event) => {
    task.title = event.target.value
  }

  const h_DelIcon_onClick = () => {
    fetch(`${URL}/list/${task.id}`, {method: 'DELETE'})
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
              dispatchPages({ type: 'HIDE_EDIT' })
            }
          )
      } else {
        return res.error
      }
    })
  }

  const taskEditWrap = pages.edit === 'hide' ? 'hide' : ''
  const btnDel = pages.edit === 'hide' ? 'hide' : ''
  const taskShowWrap = pages.edit === 'hide' ? '' : 'hide'
  const btnAdd = pages.edit === 'hide' ? '' : 'hide'
  const Title = pages.edit === 'hide' ? 'Список задач' : `Задача № ${task.id}`

  // console.log( 'tasks', tasks, pages, task, refInput.current.value)

  return (
    <Context.Provider value={{dispatchTasks, dispatchPages}}>
      <div className="wrap">
        <header>
          <h3>{Title}</h3>
          <button className={btnAdd} onClick = {h_BtnAdd_onClick}>Добавить</button>
          <button className={`btn-del-wrap ${btnDel}`}>
            <div className="btn-del-inside" onClick={h_DelIcon_onClick}>
              <span>Удалить</span>
              <i className="small material-icons">delete</i>
            </div>
          </button>
        </header>
      
        <main className='of'>
          <ul className={taskShowWrap}>
            <ListOfTasks tasks={tasks} URL={URL} task={task} input={refInput}/>
          </ul>
          <div className={taskEditWrap}>
            <div className="task-edit">
              <label>Краткое описание</label>
              <input type="text" ref={refInput} onChange={h_Input2_onChange}></input>
              <button className="create" onClick={h_BtnCreate_onClick}>Вернуться к списку</button>
            </div>
          </div>
        </main>
      </div>

      <footer>(c) 2019 ОАО "Мегаполис"</footer>

      <ModalCreateTask pages={pages} URL={URL} />
      
     </Context.Provider>
  );
}

