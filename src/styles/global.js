import { createGlobalStyle, css, keyframes } from "styled-components";
import { fontStack, bp, bpm } from "./theme";

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

function itemSpanCSS() {
  let styles = "";

  for (let i = 0; i < 40; i += 1) {
    styles += `
      .item-span-${i} {
        animation-delay: ${0.5 + i / 8}s !important;
      }
    `;
  }
  return css`
    ${styles}
  `;
}

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
    ${itemSpanCSS()}
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    
    h1 {
      line-height: .8;
      font-weight: 700;
      font-size: 3.75rem;
    }
    
    .mobile-only {
      ${bpm.tablet`
        display: initial;
      `}
      
      ${bp.tablet`
        display: none;
      `}
    }
  }
`;
