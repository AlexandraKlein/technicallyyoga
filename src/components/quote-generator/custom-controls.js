import React from "react";
import styled from "styled-components/macro";
import Button from "../Button";

const CustomControls = ({
  type,
  maxLength,
  placeholder,
  handleBackgroundImages,
  handleCreateCustomQuote,
}) => (
  <CustomInputs>
    <Button isSecondary onClick={handleBackgroundImages}>
      Change Background
    </Button>
    <input
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={handleCreateCustomQuote}
    />
  </CustomInputs>
);

export default CustomControls;

const CustomInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 30px 0;
  }
`;
