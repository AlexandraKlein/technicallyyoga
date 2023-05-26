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

  100% {
    opacity: 1;
    transform: translate(0, 0) skew(0deg);
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
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:400');
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Alegreya&display=swap');
  @import url('https://fonts.googleapis.com/css2?&family=Anton&display=swap');
  @import url('https://fonts.googleapis.com/css2?&family=Lily+Script+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?&family=Work+Sans&display=swap');

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

    button,
    input {
      outline: 0;
      -webkit-appearance: none;
      box-sizing: border-box;
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
