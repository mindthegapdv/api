import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserPreferences from './UserPreferences'

const NotFound = () => (
  <p>Not Found</p>
)

export default () => (
  <Switch>
    <Route exact path='/preferences' component={UserPreferences} />
    <Route component={NotFound} />
  </Switch>
)
