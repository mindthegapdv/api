import React, { useState } from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import { updateDietaryRequirements } from 'api'
import { useToken } from 'hooks'

const DietaryRequirements = styled(Col)`
  background-color: ${props => props.theme.colors.primaryBlue};
  padding: 30px 20px;
`

const H3 = styled.h3`
  color: white;
  font-size: 18px;
`

const Email = styled.p`
  color: white;
  opacity: .5;
`

const TextArea = styled.textarea`
  margin: 15px 0;
  border: none;
  border-radius: 6px;
  width: 100%;
  outline: none;
  padding: 10px;
  font-size: 12px;
  resize: none;
`

const UpdateButton = styled.div`
  padding: 10px;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
  text-align: center;
`

export default ({ location, user }) => {
  const { email, dietaryRequirements } = user
  const [requirements, setRequirements] = useState(dietaryRequirements || '')
  const token = useToken(location)

  const handleRequirementsChange = event => setRequirements(event.target.value)
  const handleUpdateRequirements = () => updateDietaryRequirements(token, requirements)

  return (
    <DietaryRequirements xs={24}>
      <H3>Your dietary requirements</H3>
      <Email>{email}</Email>
      <TextArea rows={5} placeholder='Vegetarian, Halal, Kosher, Allergies...' value={requirements} onChange={handleRequirementsChange}/>
      <UpdateButton onClick={handleUpdateRequirements}>Update dietary requirements</UpdateButton>
    </DietaryRequirements>
  )
}
