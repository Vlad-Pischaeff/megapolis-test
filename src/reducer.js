export default function(state, action) {
  console.log('reducer', state, action)
  switch (action.type) {
    case 'SET_TASKS':
      return [...state, action.payload]
    case 'GET_TASKS':
      return [...action.payload]
    default:
      return state
  }
}
