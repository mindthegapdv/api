import React from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import logoPath from 'assets/images/logo.png'

const Banner = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  margin: auto;
`;

const Logo = styled.img`
  height: 75px;
  margin-bottom: 20px;
`

const H1 = styled.h1`
  font-family: "Nunito";
  font-size: 32px;
  text-align: center;
  line-height: 40px;
  color: ${props => props.theme.colors.primaryBlue};
  margin: 10px;
`;

const P = styled.p`
  font-family: "Nunito";
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.colors.supportingPurple};
  text-align: center;
`;

export default () => (
  <Banner xs={24}>
    <Logo src={logoPath} />
    <H1>Thank you for helping reduce food waste</H1>
    <P>Your feedback helps us accurately order and ensure great quality and sustainable food</P>
  </Banner>
)
