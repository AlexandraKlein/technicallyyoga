import React, { Component } from 'react';
import styled from 'styled-components/macro';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import animateScrollTo from 'animated-scroll-to';
import Text from 'markov-chains-text';
import { yogaQuotes } from '../../quotes.js';
import { fadeIn, textFadeIn } from '../../styles/global';
import { bp, theme } from '../../styles/theme';

const imageSettings = {
  width: 900,
  height: 900,
};

class QuoteGenerator extends Component {

  constructor(props) {
    super(props);
    this.quoteImg = React.createRef();
    this.shareImgContainer = React.createRef();
    this.generator = React.createRef();
  }

  state = {
    quote: 'Click below and I will generate a quote for you.',
    numWords: null,
    image: 'https://technicallyyoga.com/images/bg-image234.jpg',
    shareImage: null,
    custom: false,
    customText: 'Create Your Own',
  };

  handleShareImage = () => {
    const createImage = () => {
      domtoimage.toJpeg(this.quoteImg.current, imageSettings).then(dataUrl => {
        this.setState({
          shareImage: dataUrl,
        });
      });
    };

    createImage();

    setTimeout(() => {
      createImage();
      animateScrollTo(this.shareImgContainer.current);
    }, 750);
  };

  handleCustomChoice = () => {
    this.setState({
      custom: !this.state.custom,
      customText: this.state.custom
        ? 'Create Your Own'
        : 'Go Back To Generator',
      quote: this.state.custom ? this.state.quote : '',
    });

    if (this.state.custom) {
      this.handleQuoteGenerator();
    }
  };

  handleQuoteGenerator = () => {
    const fakeYogaQuote = new Text(yogaQuotes);
    const quote = fakeYogaQuote.makeSentence();
    const maxLength = 160;
    const charIsOver = quote.length > maxLength;
    const isString = typeof quote === 'string';
    let trimmedQuote = quote.substr(0, maxLength);

    trimmedQuote = trimmedQuote.substr(
      0,
      Math.min(trimmedQuote.length, trimmedQuote.lastIndexOf(' ')),
    );

    let quoteForState;

    if (isString && charIsOver) {
      quoteForState = trimmedQuote + '.';
    } else if (isString) {
      quoteForState = quote;
    } else {
      quoteForState = 'Try again';
    }

    this.setState(
      { quote: '' },
      () =>
        this.setState({
          quote: quoteForState.trim(),
          numWords: trimmedQuote.split(' ').length,
        })
    );
  };

  wrapLines = str => {
    let words = str.split(' ');
    return words.map((val, index) => {
      return <span key={index} className={`item-span-${index}`}>{val}&nbsp;</span>;
    });
  };

  render() {
    const {
      image,
      quote,
      custom,
      customText,
      shareImage
    } = this.state;

    console.log(this.state);

    const QuoteClone = () => {
      return (
        <QuoteContainerClone>
          <QuoteWrapClone ref={this.quoteImg}>
            <BgImage src={image}/>
            <h3>
              <QuoteBefore style={{top: '-120px'}}>&ldquo;</QuoteBefore>
              {quote}
              <QuoteAfter style={{bottom: '-240px'}}>&rdquo;</QuoteAfter>
            </h3>
            <p>@technicallyyoga</p>
          </QuoteWrapClone>
        </QuoteContainerClone>
      )
    };

    const Buttons = () => {
      return (
        <ButtonContainer>

          {!custom && (
            <>
              <Button onClick={this.handleQuoteGenerator}>
                Generate Quote
              </Button>
              <p>or</p>
            </>
          )}

          <button onClick={this.handleCustomChoice}>
            { custom ? <span>&larr; &nbsp;</span> : '' }
            { customText }
          </button>
          <ButtonsRow>
            <ButtonSecondary>
              &darr; &nbsp; Save Quote As Image
            </ButtonSecondary>
            <ButtonSecondary
              onClick={this.handleShareImage}
              disabled={quote.length < 1}
            >
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

                { quote &&
                <h3>
                  <QuoteBefore>&ldquo;</QuoteBefore>
                  <span>
                    { this.wrapLines(quote) }
                  </span>
                  <QuoteAfter>&rdquo;</QuoteAfter>
                </h3>
                }
                <p>@technicallyyoga</p>
              </QuoteWrap>

            </QuoteContainer>
            <QuoteClone />

            <Buttons />
          </Generator>

          <div ref={this.shareImgContainer}>
            {shareImage && (
              <ShareImageContainer>
                <img src={shareImage} alt={quote} />

                <button
                  style={{marginTop: '15px'}}
                  className={'mobile-only'}
                  onClick={this.handleSaveImage}
                >
                  Save Quote As Image
                </button>
              </ShareImageContainer>
            )}
          </div>


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
      transform: translate(-10px, 0) skew(25deg);
      animation: ${textFadeIn} 1s ease-out forwards;
    }

    b {
      opacity: 0;
      font-size: 75px;
      animation: ${fadeIn} .5s ease-out forwards .25s;
    }
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
`;

const QuoteContainerClone = styled.div`
  display: flex;
  justify-content: center;
`;

const QuoteWrapClone = styled(QuoteWrapShared)`
  position: absolute;
  top: 0;
  left: 0;
  height: 900px;
  width: 900px;
  z-index: -1;

  h3 {
    font-size: 62px;

    b {
      font-size: 180px;
    }
  }

  p {
    font-size: 42px;
    bottom: 15px;
    right: 15px;

    ${bp.tablet`
      font-size: 38px;
      bottom: 15px;
      right: 15px;
    `}
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
  opacity: 0;
  animation: ${fadeIn} .5s ease-out .25s forwards;

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

const ShareImageContainer = styled.div`
  margin: 60px 0 30px;
  
  img {
    width: 100%;
    
    ${bp.tablet`
      width: 700px;
    `}
    
    ${bp.desktop`
      width: 520px
    `}
  }
`;
