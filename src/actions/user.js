import actionTypes from './actionTypes'

import axios from 'axios'
import { message } from 'antd'
const loginRequest = (username, password) => axios.post(
  `http://skyemperor.top:6010/api/auth/login?u=${username}&p=${password}`
)

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  //window.sessionStorage.removeItem('authToken')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin())
    //console.log(userInfo.username, userInfo.password)
    loginRequest(userInfo.username, userInfo.password)
      .then(resp => {
        if (resp.data.code === 0) {
          //console.log(resp.data.data.token)
          window.sessionStorage.setItem('Token', resp.data.data.token)
          dispatch(loginSuccess(resp.data.data))
        } else {
          dispatch(loginFailed())
          message.error('密码或账户出错', 3)
        }
      })
  }
}