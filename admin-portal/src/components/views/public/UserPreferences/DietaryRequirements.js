import React, { useState } from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import { updateDietaryRequirements } from 'api'
import { useToken } from 'hooks'


const DietaryRequirementsContainer = styled.div`
  background-color: ${props => props.theme.colors.primaryBlue};
  width: 100%;
`;

const DietaryRequirements = styled.div`
  
  padding: 2em;
  /* margin: 20px !important; */
  max-width: 450px;
  display: block;
  margin: auto;
`;


const H3 = styled.h3`
  font-family: "Nunito";
  color: white;
  font-size: 18px;
  margin-bottom: 0px;
`

const Email = styled.p`
  font-family: "Nunito";
  color: white;
  opacity: 0.5;
  margin-bottom: 0px;
`;

const TextArea = styled.textarea`
  margin: 15px 0;
  font-family: "Nunito";
  border: none;
  border-radius: 4px;
  width: 100%;
  display: border-box;
  outline: none;
  padding: 15px;
  font-size: 15px;
  resize: none;
  color: ${props => props.theme.colors.primaryBlue};
  border: 2px solid ${props => props.theme.colors.primaryBlue};
  :focus {
    border: 2px solid #d972f4;
  }
  :placeholder {
    color: ${props => props.theme.colors.supportingPurple};
  }
`;

const UpdateButton = styled.div`
  padding: 10px;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
  text-align: center;
  font-family: "Nunito";
  transition: color 0.2s, background-color 0.2s;
  :hover {
    transition: color 0.2s, background-color 0.2s;
    background-color: #fff;
    color: ${props => props.theme.colors.primaryBlue};
    cursor: pointer;
  }
`;

export default ({ location, user }) => {
  const { email, dietaryRequirements } = user
  const [requirements, setRequirements] = useState(dietaryRequirements || '')
  const token = useToken(location)

  const handleRequirementsChange = event => setRequirements(event.target.value)
  const handleUpdateRequirements = () => updateDietaryRequirements(token, requirements)

  return (
    <DietaryRequirementsContainer>
      <DietaryRequirements>
        <H3>Your dietary requirements</H3>
        <Email>{email}</Email>
        <TextArea
          rows={5}
          placeholder="Vegetarian, Halal, Kosher, Allergies..."
          value={requirements}
          onChange={handleRequirementsChange}
        />
        <UpdateButton onClick={handleUpdateRequirements}>
          Update dietary requirements
        </UpdateButton>
      </DietaryRequirements>
    </DietaryRequirementsContainer>
  );
}
