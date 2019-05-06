import {createGlobalStyle, css, keyframes} from 'styled-components'
import { theme, fontStack, bp } from './theme';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const textFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-10px, 0) skew(25deg);
  }

  65% {
    opacity: 1;
    transform: skew(0deg);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

/*function imageItemCSS() {
  let styles = '';

  for (let i = 0; i < 20; i += 1) {
    styles += `
      .item-image-${i} {
        animation-delay: ${.5 + i/15}s !important;
      }
    `;
  }
  return css`${styles}`;
}*/

export const GlobalStyle = createGlobalStyle`  
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400');
  @import url('https://fonts.googleapis.com/css?family=Sacramento');
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700');
  
  @font-face {
  font-family: 'Alegreya';
  src: url('https://technicallyyoga.com/fonts/Alegreya-Regular.woff2') format('woff2'),
  url('https://technicallyyoga.com/fonts/Alegreya-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

  @font-face {
    font-family: 'Alegreya Bold';
    src: url('https://technicallyyoga.com/fonts/Alegreya-Bold.woff2') format('woff2'),
    url('https://technicallyyoga.com/fonts/Alegreya-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Zilla';
    src: url('https://technicallyyoga.com/fonts/ZillaSlab-SemiBold.woff2') format('woff2'),
    url('https://technicallyyoga.com/fonts/ZillaSlab-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Lily Script One';
    src: url('https://technicallyyoga.com/fonts/LilyScriptOne-Regular.woff2') format('woff2'),
    url('https://technicallyyoga.com/fonts/LilyScriptOne-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Anton';
    src: url('https://technicallyyoga.com/fonts/Anton.woff2') format('woff2'),
    url('https://technicallyyoga.com/fonts/Anton.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    ${fontStack};
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    
    input[type=text],
    input[type=submit],
      button {
      outline: 0;
      -webkit-appearance: none;
    }
    
    input[type=text] {
      box-sizing : border-box;
      border: 0;
      border-bottom: 5px solid ${theme.darkBlue};
      background-color: $white !important;
      color: $dark-blue;
      font-size: 18px;
      padding: .75rem 1rem;
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
    }
    
    button,
    input[type=submit] {
      box-sizing : border-box;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 20px;
      line-height: 1;
      padding: .75rem 1rem;
      text-decoration: none;
      background-color: ${theme.pink};
      color: ${theme.darkBlue};
      cursor: pointer;
      border: solid 5px ${theme.darkBlue};
      transition: .2s;
      width: 100%;
    
      ${bp.tablet`
        padding: .75rem 2rem;
        width: auto;
      `}
    
      &:hover {
        background-color: ${theme.darkBlue};
        color: ${theme.white};
        border-radius: 180px 30px 180px 30px/30px 180px 30px 180px;
      }
    
      &:disabled {
        opacity: .7;
        pointer-events: none;
      }
    }
    
    h1 {
      line-height: .8;
      font-weight: 700;
      font-size: 3.75rem;
    }
  }
`;

