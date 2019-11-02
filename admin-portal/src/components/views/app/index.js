import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { useAuth0 } from 'auth'
import UserPreferences from 'components/views/public/UserPreferences';
import { Home } from 'components/views/Home';
import { Login } from 'components/views/Login';

export default () => {
  //const { loading } = useAuth0()
  //if (loading) {
  //  return <div>Loading...</div>
  //}

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path='/preferences' component={UserPreferences} />
      <Route path='/' component={Home} />
    </Switch>
  )
}
