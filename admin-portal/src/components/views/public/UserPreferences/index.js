import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Row } from 'antd'
import queryString from 'query-string'
import Banner from './Banner'
import Feedback from './Feedback'
import Orders from './Orders'
import Footer from './Footer'
import DietaryRequirements from './DietaryRequirements'
import { fetchUserPreferences } from 'api'

const UserPreferences = styled(Row)`
  background-color: white;
`

export default ({ location }) => {
  const [user, setUser] = useState({ id: null, email: null, dietaryRequirements: null, group: null, costCode: null })
  const [orders, setOrders] = useState({ lastOrder: null, nextOrders: [] })

  useEffect(() => {
    const { token } = queryString.parse(location.search)
    window.localStorage.setItem('token', token)
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      fetchUserPreferences(token).then(({ id, email, dietaryRequirements, group, costCode, lastOrder, orders }) => {
        setUser({ id, email, dietaryRequirements, group, costCode })
        setOrders({ lastOrder: { id: 3, feedback: null }, nextOrders: orders })
      })
    }
  }, [])

  return (
    <UserPreferences type='flex' justify='start' align='top' >
      <Banner />
      <Feedback order={orders.lastOrder} />
      <Route render={props => <Orders {...props} orders={orders.nextOrders} user={user} />} />
      <Route render={props => <DietaryRequirements {...props} user={user} />} />
      <Route component={Footer} />
    </UserPreferences>
  )
}
