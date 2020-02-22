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
    getList()
  }, [])

  const getList = () => {
    fetch(`${URL}/list`)
      .then(res => res.json())
      .then(res => setListOfTasks(res))
  }

  const showCreateWindow = () => {
    dispatchPages({ type: 'SHOW_CREATE' })
  }

  const setListOfTasks = (res) => {
    dispatchTasks({
      type: 'GET_TASKS',
      payload: res.data
    })
  }

  const hideEditWindow = () => {
    dispatchPages({ type: 'HIDE_EDIT' })
  }

  const delItem = (id) => {
    fetch(`${URL}/list/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        getList()
      } else {
        return res.error
      }
    })
  }

  const updateItem = () => {
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
      if (res.success) {
        getList()
      } else {
        return res.error
      }
    })
  }

  const h_BtnAdd_onClick = () => {
    task.title = ''
    showCreateWindow()
  }

  const h_BtnBack_onClick = () => {
    updateItem()
    hideEditWindow()
  }

  const h_Input2_onChange = (event) => {
    task.title = event.target.value
  }

  const h_DelIcon_onClick = (id) => {
    delItem(id)  
    hideEditWindow()
  }

  const editHide = pages.edit === 'hide' ? '' : 'hide'
  const Title = pages.edit === 'hide' ? 'Список задач' : `Задача № ${task.id}`

  return (
    <Context.Provider value={{dispatchTasks, dispatchPages}}>
      <div className="wrap">
        <header>
          <h3>{Title}</h3>
          <button className={editHide} onClick={h_BtnAdd_onClick}>Добавить</button>
          <button className={`btn-del-wrap ${pages.edit}`}>
            <div className="btn-del-inside" onClick={() => h_DelIcon_onClick(task.id)}>
              <span>Удалить</span>
              <i className="small material-icons">delete</i>
            </div>
          </button>
        </header>
      
        <main className='of'>
          <ul className={editHide}>
            <ListOfTasks tasks={tasks} task={task} input={refInput} delItem={delItem}/>
          </ul>
          <div className={pages.edit}>
            <div className="task-edit">
              <label>Краткое описание</label>
              <input type="text" ref={refInput} onChange={h_Input2_onChange}></input>
              <button className="create" onClick={h_BtnBack_onClick}>Вернуться к списку</button>
            </div>
          </div>
        </main>
      </div>

      <footer>(c) 2019 ОАО "Мегаполис"</footer>

      <ModalCreateTask pages={pages} URL={URL} task={task} />
      
    </Context.Provider>
  );
}
