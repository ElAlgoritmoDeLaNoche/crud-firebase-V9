import * as types from './ActionTypes'

const initialState = {
  contacts: [],
  contact: {}
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case types.GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      }
    case types.RESET: 
      return {
        ...state,
        contact: {}
      }
    default:
      return state
  }
}

export default contactReducer