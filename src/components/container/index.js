import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { bp, bpm, theme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/global';
import Main from '../../containers/main'
// import Markov from 'components/markov';
import Overlay from '../overlay';

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.webWavesRef = React.createRef();
  }

  state = {
    isOpen: false,
    mountOverlay: false,
  };

  handleWebWaves = () => {
    window.VANTA.WAVES({
      el: this.webWavesRef.current,
      color: 0x786174,
      shininess: 0.0,
      waveHeight: 7.5,
      waveSpeed: 1,
      zoom: 1.14,
    });
  };

  handleMountOverlay = () => {
    this.setState({ mountOverlay: true });
  };

  handleOverlay = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
   this.handleWebWaves();
  }

  componentDidUpdate() {
    this.handleMountOverlay();
  }

  render() {
    const { isOpen, mountOverlay } = this.state;

    return (
      <Main>
        <GlobalStyle/>
        <div>
          <CopyContainer ref={this.webWavesRef}>
            <Copy>
              <h1>= <span>Yoga</span></h1>
              <p>{this.props.description}</p>
              <Button onClick={this.handleOverlay}>About Us</Button>
            </Copy>
          </CopyContainer>
          {/*<Markov title="Yoga Quote Me" />*/}
        </div>

        <div style={{ opacity: mountOverlay ? 1 : 0 }}>
          <Overlay close={this.handleOverlay} isOpen={isOpen} />
        </div>
      </Main>
    );
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const CopyContainer = styled.div`
  position: relative;
  text-align: center;
  z-index: 0;
  
  ${bp.desktop`
    position: fixed;
    width: 40%;
    float: left;
    z-index: 2;
  `}
  
   &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .65;
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
    font-family: 'Anton', sans-serif;
    opacity: 0;
    margin-top: 0;
    margin-bottom: .5em;
    animation: ${fadeIn} .75s ease-out 1s forwards;

    ${bp.desktop`
      font-size: 7vw;
      margin-bottom: .25em;
    `}
    
     span {
      opacity:0;
      font-family: 'Sacramento', cursive;
      font-weight: normal;
      display: inline-block;
      transform: translate(-10px, 10px);
      animation: ${fadeIn} .75s ease-out 1.25s forwards;

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
    opacity:0;
    font-size: 16px;
    line-height: 1.6;
    animation: ${fadeIn} .75s ease-out 1.5s forwards;
    
    ${bp.desktop`
      font-size: 20px;
      width: 70%;
    `}
  }
`;

const Button = styled.button`
  opacity:0;
  animation: ${fadeIn} .75s ease-out 1.75s forwards;
`;

export default Container;
