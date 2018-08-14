import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import items from './items'

const rootReducer = combineReducers({
  items,
  routerReducer
})

export default rootReducer
