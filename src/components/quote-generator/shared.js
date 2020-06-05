import styled from "styled-components/macro";
import { bp, theme } from "../../styles/theme";
import { fadeIn } from "../../styles/global";

export const Button = styled.button``;

export const ButtonSecondary = styled(Button)`
  border: 0;
  border-top: 5px solid ${theme.pink};
  border-bottom: 5px solid ${theme.purple};

  &:hover {
    border-top: 5px solid ${theme.purple};
    background-color: ${theme.purple};
  }

  &:disabled {
    border-bottom: 5px solid ${theme.pink};
  }
`;

export const QuoteWrapShared = styled.div`
  padding: 0;
  background-color: ${theme.pink};
  color: ${theme.darkerBlue};
  display: flex;
  justify-content: center;
  align-items: center;

  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &:before {
    background-color: ${theme.purple};
    opacity: 0.8;
  }

  &:after {
    background-color: ${theme.purple};
    opacity: 0.65;
    mix-blend-mode: hue;
  }

  h3 {
    font-family: "Anton", sans-serif;
    font-weight: normal;
    position: relative;
    z-index: 2;
    max-width: 87.5%;
    margin: 0 auto;
    color: ${theme.pink};
    mix-blend-mode: overlay;

    b {
      position: absolute;
      font-family: "Lily Script One", cursive;
      color: ${theme.darkPurple};
      font-weight: normal;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-family: "Alegreya", serif;
    color: ${theme.purple};
    margin: 0;
    position: absolute;
    z-index: 1;
    mix-blend-mode: multiply;
  }
`;

export const BgImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const QuoteCharacter = styled.b`
  opacity: 0;
  font-size: 75px;
  animation: ${fadeIn} 0.5s ease-out forwards 0.25s;

  ${bp.tablet`
    font-size: 100px;
  `}
`;

export const QuoteBefore = styled(QuoteCharacter)`
  top: -50px;

  ${bp.tablet`
    top: -70px;
  `}
`;

export const QuoteAfter = styled(QuoteCharacter)`
  bottom: -100px;

  ${bp.tablet`
    bottom: -140px;
  `}
`;
