import React from "react";
import styled from "styled-components/macro";
import { fadeIn } from "../../styles/global";
import { bp, theme } from "../../styles/theme";
import Button from "../Button";

const ButtonGroup = ({
  custom,
  customText,
  quote,
  handleSaveImage,
  handleQuoteGenerator,
  handleCustomChoice,
  handleShareImage,
}) => (
  <ButtonContainer>
    {!custom && (
      <>
        <Button onClick={handleQuoteGenerator}>Generate Quote</Button>
        <p>or</p>
      </>
    )}

    <Button onClick={handleCustomChoice}>
      {custom ? <span>&larr; &nbsp;</span> : ""}
      {customText}
    </Button>
    <ButtonsRow>
      <Button isSecondary disabled={quote.length < 1} onClick={handleSaveImage}>
        &darr; &nbsp; Save Quote As Image
      </Button>
      <Button
        isSecondary
        onClick={handleShareImage}
        disabled={quote.length < 1}
      >
        Create Share Image
      </Button>
    </ButtonsRow>
  </ButtonContainer>
);

export default ButtonGroup;

const ButtonContainer = styled.div`
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.25s forwards;

  p {
    position: relative;
    padding: 20px 0;

    ${bp.tablet`
      padding: 0;
    `}

    &:before,
    &:after {
      content: "";
      position: absolute;
      width: calc(50% - 30px);
      height: 2px;
      background-color: ${theme.darkBlue};
      top: 50%;
      transform: translateY(-50%);

      ${bp.tablet`
        width: calc(50% - 50px);
      `}
    }

    &:before {
      left: 0;

      ${bp.tablet`
        left: 20px;
      `}
    }

    &:after {
      right: 0;

      ${bp.tablet`
        right: 20px;
      `}
    }
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 45px;

  ${bp.tablet`
    flex-direction: row;
  `}

  button {
    margin: 10px 0;
    ${bp.tablet`
      margin: 0 10px;
    `}
  }
`;
