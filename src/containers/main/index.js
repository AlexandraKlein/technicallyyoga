import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/global';

const Main = props => {

  return (
    <MainContainer>
      <GlobalStyle/>
      { props.children }
    </MainContainer>
  )

};

const MainContainer = styled.main`
  position: relative;
  font-size: 18px;
  min-height: 100vh;
  text-align: center;
  background-color: ${theme.pink};
  overflow: hidden;
`;


export default Main;
