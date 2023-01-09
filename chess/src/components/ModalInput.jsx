import React from "react"
import styled from "styled-components"

const ModalInput = ({type, placeholder, value, onChange}) => {
  return (
    <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} required="required"/>
  )
}

const StyledInput = styled.input`
  background: rgba(255, 213, 148, 0.3); 
  padding: min(1rem, 3.2vw);
  font-family: inherit;
  font-size: min(1rem, 3.2vw);
  margin-left: min(1rem, 3.2vw);
  margin-right: min(1rem, 3.2vw);
  margin-top: min(1rem, 3.2vw);
  border: min(0.1rem, 0.3vw) solid var(--primary);
  color: var(--primary);
  border-radius: var(--radius);
  height: min(3rem, 9.6vw);
`

export default ModalInput
