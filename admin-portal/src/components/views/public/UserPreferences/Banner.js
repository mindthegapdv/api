import React from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import logoPath from 'assets/images/logo.png'

const Banner = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  height: 75px;
  margin-bottom: 20px;
`

const H1 = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 10px;
`

const P = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryBlue};
  text-align: center;
`

export default () => (
  <Banner xs={24}>
    <Logo src={logoPath} />
    <H1>Thank you for helping reduce food waste</H1>
    <P>Your feedback helps us accurately order and ensure great quality and sustainable food</P>
  </Banner>
)
