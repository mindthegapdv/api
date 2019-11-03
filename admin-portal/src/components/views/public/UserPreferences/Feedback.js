import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import dislikePath from 'assets/images/dislike.png'
import likePath from 'assets/images/like.png'
import { sendLastOrderFeedback } from 'api'

const FeedbackContainer = styled.div`
  display: block;
  margin: auto !important;
  max-width: 450px;
  width: 100%;
`;

const Feedback = styled.div`
  display: flex;
  padding: 2em;
  margin: 20px !important;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryBlue};
  border-radius: 6px;
`;

const H3 = styled.h3`
  font-family: 'Nunito';
  line-height: 20px;
  font-size: 24px;
  margin-bottom: 10px;
  color: white;
`

const Date = styled.p`
  color: white;
  font-family: 'Nunito';
  font-size: 16px;
  margin-top: 0px;
  line-height: 20px;
  opacity: 0.5;
`;

const Options = styled(Row)`
  display: flex;
  /* width: 100%; */
`;

const OptionContainer = styled(Col)`
  display: flex;
  grid-template-columns: 40px 1fr;
  border: 1px solid white;
  border-radius: 6px;
  padding: 10px 15px 10px 15px;
  color: white;
  font-family: "Nunito";
  font-size: "15px";
  margin: 10px;
  align-items: center;
`;

const Thumb = styled.img`
  display: block;
  height: 20px;
  margin-right: 20px;
`

const P = styled.span`
  display: inline-block;
  font-family: "Nunito";
  font-size: "16px";
  color: ${props => props.theme.colors.supportingPurple};;
  text-decoration: underline;
`;

const Option = ({ path, feedback }) => {
  const token = window.localStorage.getItem('token')

  const handleClick = () => {
    sendLastOrderFeedback(token)
  }

  return (
    <OptionContainer onClick={handleClick}>
      <Thumb src={path} />
      {feedback === -1 ? (
        <span>Not right</span>
      ) : (
        <span>Great</span>
      )}
    </OptionContainer>
  )
}

export default ({ order }) => {
  const token = window.localStorage.getItem('token')

  const handleClick = (orderId, feedback) => {
    sendLastOrderFeedback(token, orderId, feedback)
  }

  return (
    <Fragment>
      {order &&
        <FeedbackContainer xs={24}>
          <Feedback>
            <H3>How was your meal?</H3>
            <Date>Yesterday, 2nd November 2019</Date>
            <Options type={'flex'}>
              <Option path={dislikePath} feedback={-1} />
              <Option path={likePath} feedback={1} />
            </Options>
            <P onClick={() => handleClick(order.id, 0)}>I didn't eat</P>
          </Feedback>
        </FeedbackContainer>
      }
    </Fragment>
  )
}
