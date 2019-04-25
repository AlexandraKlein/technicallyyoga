import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { bp, bpm, theme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/global';
// import Markov from 'components/markov';
import Overlay from '../overlay';

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.webNet = React.createRef();
  }

  state = {
    isOpen: false,
    mountOverlay: false,
  };

  componentDidMount() {
    window.VANTA.WAVES({
      el: this.webNet.current,
      color: 0x786174,
      shininess: 0.0,
      waveHeight: 7.5,
      waveSpeed: 1,
      zoom: 1.14,
    });
    this.handleMountOverlay();
  }

  handleMountOverlay = () => {
    setTimeout(() => {
      this.setState({
        mountOverlay: true,
      });
    }, 1000);
  };

  handleOverlay = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isOpen, mountOverlay } = this.state;

    const overlayOpacity = mountOverlay ? 1 : 0;

    return (
      <Main>
        <GlobalStyle/>
        <div>
          <CopyContainer ref={this.webNet}>
            <Copy>
              <h1>
                Technically <span>Yoga</span>
              </h1>
              <p>
                Technically Yoga is the spirit front end of three who love yoga,
                tech, and Marina Del Rey. Click away and discover a quote that
                makes your horoscope jealous. A Technically Yoga generated quote
                is guaranteed to either awaken your soul, give cognitive unease,
                brighten your Darshan or bring understanding to that mildly
                depressed itch in the back of your head. This is where your
                Karma and Meta Elements link to bring you a moment of ease. Or,
                create your own quote and give Rumi a run for his shakti. You
                can save a Technically Yoga quote and share with a friend.
              </p>
              <Button onClick={this.handleOverlay}>About Us</Button>
            </Copy>
          </CopyContainer>
          {/*<Markov title="Yoga Quote Me" />*/}
        </div>

        <div style={{ opacity: overlayOpacity }}>
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

const Main = styled.main`
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
