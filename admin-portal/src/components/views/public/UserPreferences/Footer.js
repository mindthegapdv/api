import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import logoPath from 'assets/images/logo-footer.png'

const FooterWrapper = styled.div`
  display: flex;
  margin: auto !important;
  background-color: ${props => props.theme.colors.lightGrey};
  font-family: "Nunito";
  padding: 24px !important;
  justify-content: center;
`;

const Footer = styled.div`
  max-width: 450px;
  width: 100%;
  padding: 24px;
  background-color: ${props => props.theme.colors.lightGrey};
  
  font-family: "Nunito";
`;

const TopRow = styled(Row)`
  margin-bottom: 25px;
`

const CompanyName = styled.h5`
  font-size: 16px;
  margin-bottom: 0px;
`

const Address = styled.p`
  font-size: 14px;
  opacity: .5;
`

const Logo = styled.img`
  height: 50px;
`

const Link = styled.p`
  font-size: 14px;
  text-decoration: underline;
  margin-bottom: 5px;
`

export default () => (
  <FooterWrapper>
    <Footer>
      <TopRow type="flex" justify="space-between">
        <Col xs={21}>
          <CompanyName>need2feed</CompanyName>
          <Address>10 Hudson Yards, NY, 10001</Address>
        </Col>
        <Col xs={3}>
          <Logo src={logoPath} />
        </Col>
      </TopRow>
      {/* <Link>Contact us</Link>
    <Link>Data privacy</Link> */}
    </Footer>
  </FooterWrapper>
);
