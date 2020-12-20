import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.sessionStorage.getItem('Token'))

const initState = {
  isLogin,
  isLoading: false
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILED:
      return {
        isLogin: false,
        isLoading: false,
      }
    default:
      return state
    }
}