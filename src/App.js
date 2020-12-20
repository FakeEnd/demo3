import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { adminRoutes } from './routes'
import { Frame } from './components'

const App = () => {
  const isLogin = useSelector(state => state.user.isLogin)
  return (
    isLogin
      ?
      <Frame>
      <Switch>
        {
          adminRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                component={route.component}
              />
            )
          })
        }
        <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
        <Redirect to="/404" />
      </Switch>
      </Frame>
      :
      <Redirect to="/login" />
  )
}
export default App