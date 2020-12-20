import {
  Search,
  Login,
  NotFound,
  Update,
  All,
  Person,
} from '../views'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
  pathname: '/admin/pesron',
  component: Person,
  title: '个人信息',
  icon: 'user',
  isNav: true,
},{
  pathname: '/admin/all',
  component: All,
  title: '我的课程',
  icon: 'unordered-list',
  isNav: true,
},{
  pathname: '/admin/search',
  component: Search,
  title: '选课列表',
  icon: 'search',
  isNav: true,
},{
  pathname: '/admin/update',
  component: Update,
  title: '更新个人信息',
  icon: 'form',
  isNav: true,
}]