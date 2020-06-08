import React, { PureComponent } from "react";
import styled from "styled-components/macro";
import domtoimage from "dom-to-image";
// eslint-disable-next-line no-unused-vars
import { saveAs } from "file-saver";
import animateScrollTo from "animated-scroll-to";
import Text from "markov-chains-text";
import { yogaQuotes } from "../../quotes.js";
import { QuoteWrap, BgImage, QuoteBefore, QuoteAfter } from "./QuoteStack";
import QuoteClone from "./QuoteClone";
import CustomControls from "./CustomControls";
import { fadeIn, textFadeIn } from "../../styles/global";
import { bp, theme } from "../../styles/theme";
import Button from "../Button.jsx";

const imageSettings = {
  width: 900,
  height: 900,
};

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://type.fit/api/quotes";

class QuoteGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.quoteImg = React.createRef();
    this.shareImgContainer = React.createRef();
    this.generator = React.createRef();

    this.state = {
      data: [],
      quote: "Click below and I will generate a quote for you.",
      numWords: null,
      image: "https://technicallyyoga.com/images/bg-image234.jpg",
      shareImage: null,
      custom: false,
      customText: "Create Your Own",
    };
  }

  componentDidMount() {
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

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
    domtoimage.toBlob(this.quoteImg.current, imageSettings).then(blob => {
      window.saveAs(blob, "technically-yoga-quote.png");
    });
  };

  handleCustomChoice = () => {
    this.setState({
      custom: !this.state.custom,
      customText: this.state.custom
        ? "Create Your Own"
        : "Go Back To Generator",
      quote: this.state.custom ? this.state.quote : "",
    });

    if (this.state.custom) {
      this.handleQuoteGenerator();
    }
  };

  handleBackgroundImages = () => {
    const numImages = 243;
    const getRandomImage = () => Math.floor(Math.random() * numImages);

    this.setState({
      image: `https://technicallyyoga.com/images/bg-image${getRandomImage()}.jpg`,
    });
  };

  handleCreateCustomQuote = e => {
    this.setState({
      quote: e.target.value,
    });
  };

  handleQuoteGenerator = () => {
    const quotes = this.state.data.map(quote => quote.text);
    const quoteText = quotes.join(" ");

    console.log({ quoteText });

    const fakeYogaQuote = new Text(quoteText);
    const quote = fakeYogaQuote.makeSentence();
    const maxLength = 160;
    const charIsOver = quote.length > maxLength;
    const isString = typeof quote === "string";
    let trimmedQuote = quote.substr(0, maxLength);

    trimmedQuote = quote
      .substr(0, maxLength)
      .substr(0, Math.min(trimmedQuote.length, trimmedQuote.lastIndexOf(" ")));

    const quoteForState =
      isString && charIsOver
        ? trimmedQuote + "."
        : isString
        ? quote
        : "Try again";

    this.handleBackgroundImages();

    this.setState({ quote: "" }, () =>
      this.setState({
        quote: quoteForState.trim(),
        numWords: trimmedQuote.split(" ").length,
      })
    );
  };

  wrapWords = str => {
    let words = str.split(" ");
    return words.map((val, index) => {
      return (
        <span key={index} className={`item-span-${index}`}>
          {val}&nbsp;
        </span>
      );
    });
  };

  render() {
    const { image, quote, custom, customText, shareImage, data } = this.state;
    console.log({ data });
    return (
      <Container>
        <div>
          <Generator ref={this.generator}>
            {custom && (
              <CustomControls
                type="text"
                maxLength={200}
                placeholder="Write your own quote here."
                handleBackgroundImages={this.handleBackgroundImages}
                handleCreateCustomQuote={this.handleCreateCustomQuote}
              />
            )}

            <QuoteContainer>
              <QuoteWrapper>
                <BgImage src={image} />
                {quote && (
                  <h3>
                    <QuoteBefore>&ldquo;</QuoteBefore>
                    {this.wrapWords(quote)}
                    <QuoteAfter>&rdquo;</QuoteAfter>
                  </h3>
                )}
                <p>@technicallyyoga</p>
              </QuoteWrapper>
            </QuoteContainer>

            <QuoteClone quoteImg={this.quoteImg} image={image} quote={quote} />

            <ButtonContainer>
              {!custom && (
                <>
                  <Button onClick={this.handleQuoteGenerator}>
                    Generate Quote
                  </Button>
                  <p>or</p>
                </>
              )}

              <Button onClick={this.handleCustomChoice}>
                {custom ? <span>&larr; &nbsp;</span> : ""}
                {customText}
              </Button>
              <ButtonsRow>
                <Button
                  isSecondary
                  disabled={quote.length < 1}
                  onClick={this.handleSaveImage}
                >
                  &darr; &nbsp; Save Quote As Image
                </Button>
                <Button
                  isSecondary
                  onClick={this.handleShareImage}
                  disabled={quote.length < 1}
                >
                  Create Share Image
                </Button>
              </ButtonsRow>
            </ButtonContainer>
          </Generator>

          <div ref={this.shareImgContainer}>
            {shareImage && (
              <ShareImageContainer>
                <img src={shareImage} alt={quote} />
              </ShareImageContainer>
            )}
          </div>
        </div>
      </Container>
    );
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
  animation: ${fadeIn} 0.25s ease-out 0.5s forwards;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`;

const QuoteWrapper = styled(QuoteWrap)`
  margin-top: calc((100vw - 20px) / 20);
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
      animation: ${textFadeIn} 0.65s ease-out forwards;
    }

    b {
      opacity: 0;
      font-size: 75px;
      animation: ${fadeIn} 0.5s ease-out 0.25s forwards;
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

const ButtonContainer = styled.div`
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.75s forwards;

  p {
    position: relative;
    padding: 20px 0;

    ${bp.tablet`
      padding: 0;
    `}

    &:before,
    &:after {
      content: "";
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
  flex-direction: column;
  justify-content: center;
  margin-top: 45px;

  ${bp.tablet`
    flex-direction: row;
  `}

  button {
    margin: 10px 0;
    ${bp.tablet`
      margin: 0 10px;
    `}
  }
`;
