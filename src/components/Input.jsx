import React from "react";
import styled from "styled-components/macro";
import { theme, bp } from "../styles/theme";

const Input = props => <StyledInput {...props} />;

export default Input;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 5px solid ${theme.darkBlue};
  background-color: $white !important;
  color: ${theme.darkBlue};
  font-size: 18px;
  padding: 0.75rem 1rem;
  border-radius: 0;
  margin-bottom: 20px;
  width: 100%;

  ${bp.tablet`
    padding: .75rem 2rem;
    width: 700px;
    `}

  ${bp.desktop`
    width: 520px;
    `}
`;
