import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import logoPath from 'assets/images/logo-footer.png'

const Footer = styled(Col)`
  background-color: ${props => props.theme.colors.ligthGrey};
  padding: 30px 20px;
`

const TopRow = styled(Row)`
  margin-bottom: 25px;
`

const CompanyName = styled.h5`
  font-size: 14px;
`

const Address = styled.p`
  font-size: 12px;
  opacity: .5;
`

const Logo = styled.img`
  height: 50px;
`

const Link = styled.p`
  font-size: 12px;
  text-decoration: underline;
  margin-bottom: 5px;
`

export default () => (
  <Footer xs={24}>
    <TopRow type='flex' justify='space-between'>
      <Col xs={21}>
        <CompanyName>Need 2 Feed</CompanyName>
        <Address>10 Hudson Yards, NY, 10001</Address>
      </Col>
      <Col xs={3}>
        <Logo src={logoPath} />
      </Col>
    </TopRow>
    <Link>Contact us</Link>
    <Link>Data privacy</Link>
  </Footer>
)
