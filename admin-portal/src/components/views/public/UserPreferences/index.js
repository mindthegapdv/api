import React, { Fragment, useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Row, Spin } from 'antd'
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
const Loader = styled(Spin)``

export default ({ location }) => {
  const [user, setUser] = useState({ id: null, email: null, dietaryRequirements: null })
  const [orders, setOrders] = useState({ lastOrder: null, nextOrders: [] })

  useEffect(() => {
    const { token } = queryString.parse(location.search)
    window.localStorage.setItem('token', token)
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      fetchUserPreferences(token).then(({ id, email, dietaryRequirements, lastOrder, orders }) => {
        setUser({ id, email, dietaryRequirements })
        setOrders({ lastOrder: { id: 3, feedback: null }, nextOrders: orders })
      })
    }
  }, [])

  return (
    <UserPreferences type='flex' justify='start' align='top' >
      {user.id ? (
        <Fragment>
          <Banner />
          <Feedback order={orders.lastOrder} />
          <Route render={props => <Orders {...props} orders={orders.nextOrders} />} />
          <Route render={props => <DietaryRequirements {...props} user={user} />} />
          <Route component={Footer} />
        </Fragment>
      ) : (
        <Loader />
      )}
    </UserPreferences>
  )
}
