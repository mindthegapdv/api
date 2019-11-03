import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import dislikePath from 'assets/images/dislike.png'
import likePath from 'assets/images/like.png'
import { updateOrderFeedback } from 'api'
import { useToken } from 'hooks'
import smilePath from 'assets/images/smile.png'

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
  transition: transform 0.3s;
  :hover {
    transform: translateY(-5px);
    transition: transform 0.3s;
    cursor: pointer;
  }
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
  cursor: pointer;
`;

const Option = ({ path, feedback, orderId, setFeedbackGiven }) => {
  const token = useToken()

  const handleClick = () => {
    updateOrderFeedback(token, orderId, feedback)
    setFeedbackGiven(true)
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

const Smile = styled.img`
  height: 30px;
`

const ThankH3 = styled.h3`
  font-size: 18px;
  color: white;
  font-family: 'Nunito';
  margin: 10px 0 0 0 !important;
`

const ThankP = styled.p`
  font-size: 12px;
  color: white;
  opacity: .5;
  font-family: 'Nunito';
  margin: 0 !important;
`

const FeedbackCard = ({ order }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const token = useToken()

  const handleClick = (orderId, feedback) => {
    updateOrderFeedback(token, orderId, feedback)
    setFeedbackGiven(true)
  }

  return feedbackGiven ? (
      <FeedbackContainer>
        <Feedback>
          <Smile src={smilePath} />
          <ThankH3>Thank you for your feedback</ThankH3>
          <ThankP>We'll consider this for future orders</ThankP>
        </Feedback>
      </FeedbackContainer>
    ) : (
      <FeedbackContainer xs={24}>
        <Feedback>
          <H3>How was your meal?</H3>
          <Date>Yesterday, 2nd November 2019</Date>
          <Options type={'flex'}>
            <Option path={dislikePath} feedback={-1} setFeedbackGiven={setFeedbackGiven} orderId={order.id} />
            <Option path={likePath} feedback={1} setFeedbackGiven={setFeedbackGiven} orderId={order.id} />
          </Options>
          <P onClick={() => handleClick(order.id, 0)}>I didn't eat</P>
        </Feedback>
      </FeedbackContainer>
    )
}

export default ({ order }) => {
  return (
    <Fragment>
      {order && <FeedbackCard order={order}/>}
    </Fragment>
  )
}
