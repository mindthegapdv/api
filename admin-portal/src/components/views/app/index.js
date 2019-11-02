import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { useAuth0 } from 'auth'
import Protected from 'components/views/protected'
import Public from 'components/views/public'

export default () => {
  const { user } = useAuth0()

  return (
    <Route path='/' render={props => user ? <Protected /> : <Public />} />
  )
}
