import produce from 'immer'

const initialState = [
  {
    id: '1',
    title: '列表页',
    router: '/editor/list',

    // 组件列表，包含容器组件、表单组件等
    components: [],
  }
]

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_PAGE': {
      return [...state, payload]
    }
    case 'DEL_PAGE': {
      const { id } = payload
      return state.filter(page => page.id !== id);
    }
    default: {
      return state
    }
  }
}
