import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

const Feedback = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryBlue};
  padding: 25px 10px;
  border-radius: 6px;
  margin-top: 40px;
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

`

export default ({ order }) => {
  return (
    <Fragment>
      {!order &&
        <Feedback xs={24}>
          <H3>How was your meal?</H3>
          <Date>Yersterday</Date>
          <Options>

          </Options>
        </Feedback>
      }
    </Fragment>
  )
}
