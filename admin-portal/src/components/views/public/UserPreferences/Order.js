import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Collapse, Input, Icon } from 'antd'
import plateIconPath from 'assets/images/plate-icon.png'

const { Panel } = Collapse

const Order = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`

const Day = styled.h4`
  font-size: 18px;
`

const Date = styled.p`

`

// Panel Header
const OrderCollapse = styled(Collapse)`
  margin: 5px 0 !important;
`

const PanelHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const PanelHaderPlateIcon = styled.img`
  height: 15px;
  margin-right: 15px;
`

const PanelHeaderText = styled.p`
  margin: 0;
`

const PanelHeader = ({ text }) => {
  return (
    <PanelHeaderContainer>
      <PanelHaderPlateIcon src={plateIconPath} />
      <PanelHeaderText>{text}</PanelHeaderText>
    </PanelHeaderContainer>
  )
}

export default ({ order, user }) => {
  const { group, costCode } = user
  const { name } = order
  const { dt_scheduled } = order
  const day = moment(dt_scheduled).format('dddd')
  const date = moment(dt_scheduled).format('hh:mma - Do MMM YYYY')

  return (
    <Order>
      <Day>{day}</Day>
      <Date>{date}</Date>
      <OrderCollapse expandIconPosition='right'>
        <Panel header={<PanelHeader text={'DV Lon Perm Lunch (Group A)'} />} key="1">
          <div>test</div>
        </Panel>
      </OrderCollapse>
      <Input value={`${group} / ${costCode}`} />
    </Order>
  )
}
