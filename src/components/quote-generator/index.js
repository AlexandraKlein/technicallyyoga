import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import animateScrollTo from 'animated-scroll-to';
import Text from 'markov-chains-text';
import { yogaQuotes } from '../../quotes.js';
import { QuoteWrapShared, BgImage, QuoteBefore, QuoteAfter } from'./shared';
import ButtonGroup from './button-group';
import QuoteClone from './quote-clone';
import CustomControls from './custom-controls';
import { fadeIn, textFadeIn } from '../../styles/global';
import { bp, theme } from '../../styles/theme';

const imageSettings = {
  width: 900,
  height: 900,
};

class QuoteGenerator extends PureComponent {

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

  handleSaveImage = () => {
    console.log('click')
    domtoimage.toBlob(this.quoteImg.current, imageSettings).then(blob => {
      window.saveAs(blob, 'quote.png');
    });
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

  handleBackgroundImages = () => {
    const numImages = 243;
    const getRandomNum = () => Math.floor(Math.random() * numImages);

    this.setState({
      image: `https://technicallyyoga.com/images/bg-image${getRandomNum()}.jpg`,
    });
  };

  handleCreateCustomQuote = e => {
    this.setState({
      quote: e.target.value,
    });
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

  wrapWords = str => {
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


    return (
      <Container>
        <div>

          <Generator ref={this.generator}>

            { custom && (
              <CustomControls
                type="text"
                maxLength={200}
                placeholder="Write your own quote here."
                handleBackgroundImages={this.handleBackgroundImages}
                handleCreateCustomQuote={this.handleCreateCustomQuote}
              />
            )}

            <QuoteContainer>
              <QuoteWrap>
                <BgImage src={image}/>

                { quote &&
                <h3>
                  <QuoteBefore>&ldquo;</QuoteBefore>
                  <span>
                    { this.wrapWords(quote) }
                  </span>
                  <QuoteAfter>&rdquo;</QuoteAfter>
                </h3>
                }
                <p>@technicallyyoga</p>
              </QuoteWrap>
            </QuoteContainer>

            <QuoteClone
              quoteImg={this.quoteImg}
              image={image}
              quote={quote}
            />

            <ButtonGroup
              custom={custom}
              customText={customText}
              quote={quote}
              handleQuoteGenerator={this.handleQuoteGenerator}
              handleCustomChoice={this.handleCustomChoice}
              handleSaveImage={this.handleSaveImage}
              handleShareImage={this.handleShareImage}
            />
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
