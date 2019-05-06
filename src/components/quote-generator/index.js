import React, { Component } from 'react';
import styled from 'styled-components';
import { fadeIn, textFadeIn } from '../../styles/global';
import { bp, bpm, theme } from '../../styles/theme';

class QuoteGenerator extends Component {

  constructor(props) {
    super(props);
    this.quoteImg = React.createRef();
    this.shareImgContainer = React.createRef();
    this.generator = React.createRef();
  }

  handleCustomChoice = () => {
    this.setState({
      custom: !this.state.custom,
      customText: this.state.custom
        ? 'Create Your Own'
        : 'Go Back To Generator',
      quote: this.state.custom ? this.state.quote : '',
    });
  };

  state = {
    quote: 'Click below and I\'ll generate a quote for you.',
    numWords: null,
    image: 'https://technicallyyoga.com/images/bg-image234.jpg',
    shareImage: null,
    custom: false,
    customText: 'Create Your Own',
  };

  render() {
    const { image, quote, custom, customText } = this.state;

    const Buttons = () => {
      return (
        <ButtonContainer>

          {!custom && (
            <>
              <Button>
                Generate Quote
              </Button>
              <p>or</p>
            </>
          )}
          <button onClick={this.handleCustomChoice}>
            {custom ? <span>&larr; &nbsp;</span> : ''}
            {customText}
          </button>
          <ButtonsRow>
            <ButtonSecondary>
              &darr; &nbsp; Save Quote As Image
            </ButtonSecondary>
            <ButtonSecondary>
              Create Share Image
            </ButtonSecondary>
          </ButtonsRow>

        </ButtonContainer>
      )
    };

    return (
      <Container>
        <div>

          <Generator ref={this.generator}>

            {custom && (
              <CustomInputs>
                <ButtonSecondary>Change Background</ButtonSecondary>
                <input
                  type="text"
                  maxLength={200}
                  placeholder="Write your own quote here."
                />
              </CustomInputs>
            )}

            <QuoteContainer>

              <QuoteWrap>
                <BgImage src={image}/>
                <h3>
                  <QuoteBefore>&ldquo;</QuoteBefore>
                  {quote}
                  <QuoteAfter>&rdquo;</QuoteAfter>
                </h3>
              </QuoteWrap>

            </QuoteContainer>

            <Buttons />
          </Generator>

        </div>
      </Container>
    )
  }
}

export default QuoteGenerator;

const Container = styled.div`
  background-color: ${theme.lightPink};
  padding: 0 20px 60px;
  
  ${bp.desktop`
    min-height: calc(100vh - 120px);
    width: 60%;
    float: right;
    display: flex;
    padding: 60px 0;
    justify-content: center;
  `}
`;

const Generator = styled.div`
  ${bp.desktop`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

const QuoteContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} .5s ease-out 2s forwards;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`;

const QuoteWrapShared = styled.div`
padding: 0;
  background-color: ${theme.pink};
  color: ${theme.darkerBlue};
  display: flex;
  justify-content: center;
  align-items: center;

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &:before {
    background-color: ${theme.purple};
    opacity: .8;
  }

  &:after {
    background-color: ${theme.purple};
    opacity: .65;
    mix-blend-mode: hue;
  }

  h3 {
    font-family: 'Anton', sans-serif;
    font-weight: normal;
    position: relative;
    z-index: 2;
    max-width: 87.5%;
    margin: 0 auto;
    color: ${theme.pink};
    mix-blend-mode: overlay;

    b {
      position: absolute;
      font-family: 'Lily Script One', cursive;
      color: ${theme.darkPurple};
      font-weight: normal;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-family: 'Alegreya', serif;
    color: ${theme.purple};
    margin: 0;
    position: absolute;
    z-index: 1;
    mix-blend-mode: multiply;
  }
`;

const QuoteWrap = styled(QuoteWrapShared)`
  margin-top: calc((100vw - 20px)/20);
  position: relative;
  height: calc(100vw - 20px);
  width: calc(100vw - 20px);
  
  ${bp.tablet`
    margin-top: calc((100vw - 700px)/2);
    height: 700px;
    width: 700px;
  `}
  
  ${bp.desktop`
    margin-top: 0;
    height: 520px;
    width: 520px;
  `}
  
  h3 {
    font-size: 6vw;
    
    ${bp.tablet`
      font-size: 46px;
    `}
    
    ${bp.desktop`
       font-size: 36px;
    `}
    
    span {
      display: inline-block;
      opacity: 0;
    }
    
    b {
      opacity: 0;
      font-size: 75px;
      animation: ${fadeIn} .5s ease-out forwards .25s;
    }
    
    p {
      font-size: 16px;
      bottom: 10px;
      right: 10px;
      
      ${bp.tablet`
        font-size: 22px;
        bottom: 15px;
        right: 15px;
      `}
    }
  }
`;

const QuoteCharacter = styled.b`
  opacity: 0;
  font-size: 75px;
  animation: ${fadeIn} .5s ease-out forwards .25s;
  
  ${bp.tablet`
    font-size: 100px;
  `}
`;

const QuoteBefore = styled(QuoteCharacter)`
  top: -50px;
  
  ${bp.tablet`
    top: -70px;
  `}
`;

const QuoteAfter = styled(QuoteCharacter)`
  bottom: -100px;
  
  ${bp.tablet`
    bottom: -140px;
  `}
`;

const BgImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CustomInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 30px 0;
  }
`;

const Button = styled.button``;

const ButtonSecondary = styled(Button)`
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

const ButtonContainer = styled.div`
  position: relative;
  // opacity: 0;
  // animation: ${fadeIn} .5s ease-out 2.25s forwards;
  z-index: 2;

  p {
    position: relative;
    padding: 20px 0;
    
    ${bp.tablet`
      padding: 0;
    `}

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: calc(50% - 30px);
      height: 2px;
      background-color: ${theme.darkBlue};
      top: 50%;
      transform: translateY(-50%);
      
      ${bp.tablet`
        width: calc(50% - 50px);
      `}
    }

    &:before {
      left: 0;
      
      ${bp.tablet`
        left: 20px;
      `}
    }

    &:after {
      right: 0;
      
      ${bp.tablet`
        right: 20px;
      `}
    }
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px;
  
  button {
    ${bp.tablet`
      margin: 0 10px;
    `}
  }
`;
