export default function(state, action) {
  // console.log('MANAGE FORMS reducer2 state -- ', state, 'action --', action.payload)
  switch (action.type) {

    case 'HIDE_EDIT':
      state.edit = 'hide'
      return {...state}

    case 'SHOW_EDIT':
      state.edit = ''
      return {...state}

    case 'HIDE_CREATE':
      state.create = 'hide'
      return {...state}

    case 'SHOW_CREATE':
      state.create = ''
      return {...state}

    default:
      return state
  }
}  
