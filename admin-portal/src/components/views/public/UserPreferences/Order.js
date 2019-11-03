import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Collapse, Input, Icon, Switch } from 'antd'
import plateIconPath from 'assets/images/plate-icon.png'
import Toggle from './Toggle'
import { updateOrderStatus } from 'api'
import { useToken } from 'hooks'

const { Panel } = Collapse

const Order = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
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

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DateContainer = styled.div`

`

const Date = styled.p`

`

const Day = styled.h4`
  font-size: 18px;
`

const ToggleContainer = styled.div`
  height: 40px;
  width: 50px;
  display: flex;
`

const RejectToggle = styled.div`
  height: 100%;
  flex: 50%;
  background-color: grey;
`

const AcceptToggle = styled.div`
  height: 100%;
  flex: 50%;
  background-color: blue;
`

export default ({ order, user }) => {
  const { group, costCode } = user
  const { name, status } = order
  const { dt_scheduled } = order
  const day = moment(dt_scheduled).format('dddd')
  const date = moment(dt_scheduled).format('hh:mma - Do MMM YYYY')
  const token = useToken()

  const handleToggle = (status) => {
    const newStatus = status ? 1 : 0
    updateOrderStatus(token, order.id, newStatus)
  }

  const statusAsBool = status ? true : false;

  return (
    <Order>
      <TopRow>
        <DateContainer>
          <Day>{day}</Day>
          <Date>{date}</Date>
        </DateContainer>
        <Switch checked={statusAsBool} onChange={handleToggle}/>
      </TopRow>

      <OrderCollapse expandIconPosition='right'>
        <Panel header={<PanelHeader text={'DV Lon Perm Lunch (Group A)'} />} key="1">
          <div>test</div>
        </Panel>
      </OrderCollapse>
      <Input value={`${group} / ${costCode}`} />
    </Order>
  )
}
