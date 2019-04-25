import { css } from 'styled-components';

export const theme = {
  white: '#fff',
  black: '#000',
  pink: '#d0bccc',
  lightPink: '#e1d4de',
  purple:  '#a0909d',
  darkPurple:  '#786174',
  blue:  '#4b8ab6',
  darkBlue: '#284b63',
  darkerBlue: '#192f3f',
  fontFamily: '\'Work Sans\', sans-serif;'
};

export const fontStack = css`
  font-family: ${theme.fontFamily};
  color: ${theme.darkerBlue};
`;

const sizes = {
  desktop: 1024,
  tablet: 768,
  phone: 576,
};

export const bp = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc
}, {});

export const bpm = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] -1}px) {
      ${css(...args)}
    }
  `;
  return acc
}, {});
