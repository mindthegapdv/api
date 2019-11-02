import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import Order from './Order'

const Orders = styled(Col)`
  padding: 30px 20px;
`

const TitleSection = styled(Row)`
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  padding-bottom: 10px;
  font-size: 14px;
`

const Day = styled.h4`

`

export default ({ orders }) => (
  <Orders xs={24}>
    <TitleSection>Your orders for the next 7 days</TitleSection>
    {orders.map(order => (
      <Order key={order.id} order={order}/>
    ))}
  </Orders>  
)