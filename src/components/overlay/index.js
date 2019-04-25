import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bp, bpm, theme } from '../../styles/theme';

const Overlay = ({ close, isOpen }) => {
  return (
    <Container className={isOpen ? 'isOpen' : ''}>
      <Content>
        <Close onClick={close}>
          <span />
          <span />
        </Close>
        <h2>About Us</h2>

        <ImageContainer>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQU1EyzgyPXXIb3Chzpbs8TynExsSehySsFng7Kn2gU_Z25gz"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://us.123rf.com/450wm/apoev/apoev1806/apoev180600178/103284771-stock-vector-default-placeholder-businesswoman-half-length-portrait-photo-avatar-woman-gray-color.jpg?ver=6"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://cbie.ca/wp-content/uploads/2018/08/female-placeholder.jpg"
              alt=""
            />
          </div>
        </ImageContainer>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat
          interdum varius sit amet mattis vulputate enim. A iaculis at erat
          pellentesque adipiscing commodo elit. Aliquam purus sit amet luctus
          venenatis lectus. Elit scelerisque mauris pellentesque pulvinar
          pellentesque. Enim blandit volutpat maecenas volutpat. At varius vel
          pharetra vel turpis nunc.
        </p>
        <p>
          Facilisi nullam vehicula ipsum a arcu cursus. Sit amet nulla facilisi
          morbi tempus iaculis urna id volutpat. Nulla aliquet porttitor lacus
          luctus accumsan tortor. Arcu ac tortor dignissim convallis aenean et
          tortor at. Eget sit amet tellus cras adipiscing enim eu turpis
          egestas. Bibendum at varius vel pharetra vel. Ut lectus arcu bibendum
          at varius vel pharetra vel turpis. Leo vel orci porta non. Enim ut
          tellus elementum sagittis.
        </p>
      </Content>
    </Container>
  );
};

const padding = '12vw';

const slideIn = keyframes`
  from {
    transform: translateX(100%); 
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Container = styled.div`
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: ${theme.darkPurple};
  height: 100%;
  right: 0;
  bottom:0;
  z-index: 1;
  animation: ${slideOut} .2s forwards;
  
  &.isOpen {
    animation: ${slideIn} .2s forwards;
  }
  
  ${bp.desktop`
    width: 60%;
  `}
  
  h2 {
     font-size: 48px;
     ${bp.desktop`
        font-size: 62px;
     `}
  }
  
  p {
    font-size: 18px;
    font-weight: 400;

    ${bp.desktop`
      font-size: 24px;
    `}
  }
`;

const Content = styled.div`
  color: ${theme.white};
  padding: 60px 20px;
  
  ${bp.desktop`
    padding: 60px ${padding};
  `}
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  
  ${bp.desktop`
    justify-content: space-between;
    margin-bottom: 60px;
  `}

  div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;

    ${bp.tablet`
      width: 200px;
      height: 200px;
    `}
    
    ${bp.desktop`
      width: 10vw;
      height: 10vw;
    `}
    
    img {
      width: 100%;
    }
  }
`;

const Close = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  span {
    background-color: ${theme.white};
    position: absolute;
    left: 50%;
    height: 100%;
    width: 2px;

    &:first-of-type {
      transform: translateX(-50%) rotate(45deg);
    }

    &:nth-of-type(2) {
      transform: translateX(-50%) rotate(-45deg);
    }
  }
`;

export default Overlay;
