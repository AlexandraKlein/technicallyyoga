import React from "react";
import styled from "styled-components/macro";
import { theme, bp } from "../styles/theme";

const Button = props => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Button;

const StyledButton = styled.button`
  box-sizing: border-box;
  font-family: "Roboto Condensed", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 1;
  padding: 0.75rem 1rem;
  text-decoration: none;
  background-color: ${theme.pink};
  color: ${theme.darkBlue};
  cursor: pointer;
  border-top: ${props =>
    props.isSecondary
      ? `5px solid ${theme.pink}`
      : `solid 5px ${theme.darkBlue}`};
  border-left: ${props =>
    props.isSecondary ? 0 : `solid 5px ${theme.darkBlue}`};
  border-bottom: ${props =>
    props.isSecondary
      ? `5px solid ${theme.purple}`
      : `solid 5px ${theme.darkBlue}`};
  border-right: ${props =>
    props.isSecondary ? 0 : `solid 5px ${theme.darkBlue}`};
  transition: 0.2s;
  width: 100%;

  ${bp.tablet`
    padding: .75rem 2rem;
    width: auto;
  `}

  &:hover {
    background-color: ${props =>
      props.isSecondary ? theme.purple : theme.darkBlue};
    color: ${theme.white};
    border-top: ${props =>
      props.isSecondary
        ? `5px solid ${theme.purple}`
        : `5px solid ${theme.darkBlue}`};
    border-radius: 180px 30px 180px 30px/30px 180px 30px 180px;
  }

  &:disabled {
    border-bottom: ${props =>
      props.isSecondary ? `5px solid ${theme.pink}` : "inherit"};
    opacity: 0.7;
    pointer-events: none;
  }
`;
