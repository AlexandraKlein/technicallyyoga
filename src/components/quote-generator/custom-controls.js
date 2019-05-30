import React from 'react';
import styled from 'styled-components/macro';
import { ButtonSecondary } from "./shared";

const CustomControls = ({type, maxLength, placeholder, handleBackgroundImages, handleCreateCustomQuote}) => (
  <CustomInputs>
    <ButtonSecondary onClick={handleBackgroundImages}>Change Background</ButtonSecondary>
    <input
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={handleCreateCustomQuote}
    />
  </CustomInputs>
);

const CustomInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 30px 0;
  }
`;

export default CustomControls;
