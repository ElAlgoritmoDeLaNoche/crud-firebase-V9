import { combineReducers } from 'redux'
import contactReducer from './Reducer'

const rootReducer = combineReducers({
  data: contactReducer
})

export default rootReducer