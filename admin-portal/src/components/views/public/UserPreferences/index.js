import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Spin } from 'antd'
import queryString from 'query-string'
import Banner from './Banner'
import Feedback from './Feedback'
import { fetchUserPreferences } from 'api'

const UserPreferences = styled(Row)`
  background-color: white;
  padding: 30px;
`

const Loader = styled(Spin)``

export default ({ location }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({ id: null, email: null, dietaryRequirements: [] })
  const [orders, setOrders] = useState({ lastOrder: null, nextOrders: [] })

  useEffect(() => {
    const { token } = queryString.parse(location.search)
    setToken(token)
  }, [])

  useEffect(() => {
    if (token) {
      fetchUserPreferences(token).then(({ id, email, dietaryRequirements, lastOrder, orders }) => {
        setUser({ ...user, id, email, dietaryRequirements })
        setOrders({ ...orders, lastOrder, nextOrders: orders })
      })
    }
  }, [token])

  return (
    <UserPreferences type='flex' justify='start' align='top' >
      {token ? (
        <Fragment>
          <Banner />
          <Feedback order={orders.lastOrder} />
        </Fragment>
      ) : (
        <Loader />
      )}
    </UserPreferences>
  )
}
