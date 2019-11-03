import React from 'react'
import styled from 'styled-components'

const ToggleContainer = styled.div`
  height: 35px;
  width: 75px;
  display: flex;
`

const Side = styled.div`
  background-color: ${props => props.color};
`

export default ({ accepted }) => {
  return (
    <ToggleContainer>
      <Side color={accepted ? '#DADADA' : '#30337C'}></Side>
      <Side color={accepted ? '#30337C' : '#DADADA'}></Side>
    </ToggleContainer>
  )
}
