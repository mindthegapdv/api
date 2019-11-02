import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Order = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`

const Day = styled.h4`
  font-size: 18px;
`

export default ({ order }) => {
  const { dt_scheduled } = order
  const date = moment(dt_scheduled).format('dddd')
  console.log(order)

  return (
    <Order>
      <Day>{date}</Day>

    </Order>
  )
}
