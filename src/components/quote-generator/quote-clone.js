import React from "react";
import styled from "styled-components/macro";
import { bp } from "../../styles/theme";
import { QuoteWrapShared, BgImage, QuoteBefore, QuoteAfter } from "./shared";

const QuoteClone = ({ quote, image, quoteImg }) => (
  <QuoteContainerClone>
    <QuoteWrapClone ref={quoteImg}>
      <BgImage src={image} />
      <h3>
        <QuoteBefore style={{ top: "-120px" }}>&ldquo;</QuoteBefore>
        {quote}
        <QuoteAfter style={{ bottom: "-240px" }}>&rdquo;</QuoteAfter>
      </h3>
      <p>@technicallyyoga</p>
    </QuoteWrapClone>
  </QuoteContainerClone>
);

export default QuoteClone;

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
