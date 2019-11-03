import React from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import logoPath from 'assets/images/logo.png'

const BannerWrapper = styled.div`
  width: 100;
  display: block;
  margin: auto;
  max-width: 450px;
  /* border: 1px solid lime; */
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px !important;
  text-align: center;
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
  <BannerWrapper>
    <Banner>
      <Logo src={logoPath} />
      <H1>Thank you for helping reduce food waste</H1>
      <P>
        Your feedback helps us accurately order and ensure great quality and
        sustainable food
      </P>
    </Banner>
  </BannerWrapper>
);
