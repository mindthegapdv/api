import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import dislikePath from 'assets/images/dislike.png'
import likePath from 'assets/images/like.png'
import { sendLastOrderFeedback } from 'api'

const FeedbackContainer = styled(Col)`
  margin: 30px 0;
  padding: 0 15px;
`

const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryBlue};
  border-radius: 6px;
`

const H3 = styled.h3`
  font-size: 18px;
  color: white;
`

const Date = styled.p`
  color: white;
  opacity: .5;
`

const Options = styled(Row)`
  width: 100%;
  margin: 15px;
`

const OptionContainer = styled(Col)`
  display: flex;
  border: 1px solid white;
  border-radius: 6px;
  padding: 15px;
  color: white;
`

const Thumb = styled.img`
  height: 18px;
  margin-right: 25px;
`

const P = styled.p`
  color: white;
  text-decoration: underline;
`

const Option = ({ path, feedback }) => {
  const token = window.localStorage.getItem('token')

  const handleClick = () => {
    sendLastOrderFeedback(token)
  }

  return (
    <OptionContainer xs={12} onClick={handleClick}>
      <Thumb src={path} />
      {feedback === -1 ? (
        <p>Not right</p>
      ) : (
        <p>Great</p>
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
            <Date>2nd November 2019</Date>
            <Options type='flex'>
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
