export default (state = false, action: { type: string; payload: boolean }) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload
    default:
      return state
  }
}


const initialState = {
  // 页面容器
  page: {
    container: {

    },
  },
}
