import React from "react"
import styled from "styled-components"

const Input = ({type, placeholder, value, onChange}) => {
  return (
    <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} required="required"/>
  )
}

const StyledInput = styled.input`
  background: rgba(255, 213, 148, 0.3); 
  padding: 1rem;
  font-family: inherit;
  font-size: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  border: 0.1rem solid var(--primary);
  color: var(--primary);
  border-radius: var(--radius);
  height: 3rem;
`

export default Input
