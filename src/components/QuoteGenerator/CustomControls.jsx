import React from "react";
import styled from "styled-components/macro";
import Input from "../Input";
import Button from "../Button";

const CustomControls = ({
  type,
  maxLength,
  placeholder,
  handleBackgroundImages,
  handleCreateCustomQuote,
}) => (
  <Container>
    <Button isSecondary onClick={handleBackgroundImages}>
      Change Background
    </Button>
    <Input
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={handleCreateCustomQuote}
    />
  </Container>
);

export default CustomControls;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 30px 0;
  }
`;
