import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

//const token = window.sessionStorage.getItem('Token') 
const service = axios.create({
  baseURL: 'http://skyemperor.top:6010/api',
  //不清楚，如果header加此处则会第一次请求的token会失效,似乎是异步的问题放弃了。。。(我好菜)
  //headers: { 'Token': window.sessionStorage.getItem('Token') }
})

service.interceptors.response.use((resp) => {
  if (resp.data.data === "请登录后重试") {
    message.error('请登录后重试', 5)
  }
  return resp
})

export const course_delete = (data) => {
  let pa = qs.stringify(data);
  return service.post('/course/delete',
    pa,
    {
      headers: {
        'Token': window.sessionStorage.getItem('Token')
      }
    }
  )
}

export const course_search = (prop, value) => {
  return service.get('/course/search',
    {
      params: {
        key: value,
        prop
      },
      headers: {
        'Token': window.sessionStorage.getItem('Token')
      }
    }
  )
}

export const course_grade = () => {
  return service.get('/course/grade', {
    headers: { 'Token': window.sessionStorage.getItem('Token') }
  })
}

export const course_personal = () => {
  return service.get('/course/personal', {
    headers: { 'Token': window.sessionStorage.getItem('Token') }
  })
}

export const course_select = (data) => {
  let pa = qs.stringify(data);
  return service.post('/course/select',
    pa,
    {
      headers: {
        'Token': window.sessionStorage.getItem('Token')
      }
    }
  )
}

export const user_info_update = (data) => {
  // let pa = JSON.stringify(data);
  // console.log(pa)
  return service.post('user/info/update',
    data,
    {
      headers: {
        'Token': window.sessionStorage.getItem('Token'),
        'Content-Type': 'application/json'
      }
    }
  )
}


export const user_info = () => {
  return service.get('/user/info', {
    headers: {
      'Token': window.sessionStorage.getItem('Token'),

    }
  })
}

export const social_work = () => {
  return service.get('/social_work/personal', {
    headers: { 'Token': window.sessionStorage.getItem('Token') }
  })
}

