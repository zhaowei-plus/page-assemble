import { combineReducers, createStore } from 'redux'

import editor from './editor'
import page from './page'

const reducers = combineReducers({
  editor,
  page,
})

export default createStore(reducers)
