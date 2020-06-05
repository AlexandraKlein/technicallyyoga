import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { GlobalStyle } from "../../styles/global";

const Main = ({ children }) => (
  <MainContainer>
    <GlobalStyle />
    {children}
  </MainContainer>
);

export default Main;

const MainContainer = styled.main`
  position: relative;
  font-size: 18px;
  min-height: 100vh;
  text-align: center;
  background-color: ${theme.pink};
  overflow: hidden;
`;
