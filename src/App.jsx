import React from "react";
import "normalize.css";
import styled from "styled-components/macro";
import ParticlesBg from "particles-bg";
import { bp, bpm, theme } from "./styles/theme";
import { GlobalStyle, fadeIn } from "./styles/global";
import Button from "./components/Button";
import QuoteGenerator from "./components/QuoteGenerator";
import Overlay from "./components/Overlay";

const description =
  "Facilisi nullam vehicula ipsum a arcu cursus. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Nulla aliquet porttitor lacus luctus accumsan tortor. Arcu ac tortor dignissim convallis aenean et tortor at. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Bibendum at varius vel pharetra vel. Ut lectus arcu bibendum at varius vel pharetra vel turpis. Leo vel orci porta non. Enim ut tellus elementum sagittis. Aliquam purus sit amet luctus venenatis lectus. Elit scelerisque mauris pellentesque pulvinar pellentesque. Enim blandit volutpat maecenas volutpat. At varius vel pharetra vel turpis nunc.";

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = React.useState(false);

  const handleOverlay = () => {
    setIsOpen(!isOpen);

    if (!isOverlayMounted) {
      setIsOverlayMounted(true);
    }
  };

  return (
    <MainContainer>
      <GlobalStyle />
      <CopyContainer>
        <ParticlesBg
          bg={true}
          color={theme.darkPurple}
          num={100}
          type="cobweb"
        />
        <Copy>
          <h1>
            Technically <span>Yoga</span>
          </h1>
          <p>{description}</p>
          <AnimatedButton onClick={handleOverlay}>About Us</AnimatedButton>
        </Copy>
      </CopyContainer>
      <QuoteGenerator />
      {isOverlayMounted && <Overlay close={handleOverlay} isOpen={isOpen} />}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  position: relative;
  font-size: 18px;
  min-height: 100vh;
  text-align: center;
  background-color: ${theme.pink};
  overflow: hidden;
`;

const CopyContainer = styled.div`
  position: relative;
  text-align: center;
  z-index: 0;

  ${bp.desktop`
    position: fixed;
    width: 40%;
    height: 100%;
    float: left;
    z-index: 2;
  `}

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.65;
    background-color: ${theme.pink};
  }
`;

const Copy = styled.div`
  text-align: center;
  position: relative;
  padding: 30px 20px 45px;
  z-index: 1;

  ${bp.desktop`
    background-color: transparent;
    top: 50%;
    transform: translateY(-50%);
    position: fixed;
    width: 60%;
    margin-right: -20%;
    padding: 0 0 0 4.5%;
    text-align: left;
  `}

  h1 {
    font-family: "Anton", sans-serif;
    opacity: 0;
    margin-top: 0.25em;
    margin-bottom: 1em;
    animation: ${fadeIn} 0.75s ease-out 0.25s forwards;

    ${bp.desktop` 
      font-size: 7vw;
      margin-top: 0;
      margin-bottom: .25em;
    `}

    span {
      opacity: 0;
      font-weight: bold;
      font-family: "Sacramento", cursive;
      display: inline-block;
      transform: translate(-10px, 10px);
      animation: ${fadeIn} 0.75s ease-out 0.5s forwards;

      ${bpm.tablet`
       display: block;
      `}

      ${bp.tablet`
        transform: translate(-36px, -11px);
        font-size: 4rem;
      `}
      
      ${bp.desktop`
        font-size: 9vw;
        transform: translate(-4.3vw, -0.6vw);
      `}
    }
  }

  p {
    opacity: 0;
    font-size: 16px;
    line-height: 1.6;
    animation: ${fadeIn} 0.75s ease-out 0.75s forwards;

    ${bp.desktop`
      font-size: 20px;
      width: 70%;
    `}
  }
`;

const AnimatedButton = styled(Button)`
  opacity: 0;
  animation: ${fadeIn} 0.75s ease-out 1s forwards;
`;

export default App;
