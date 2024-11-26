import React from "react";
import styled, { keyframes } from "styled-components";

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;

  .column {
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .circle {
    background-color: white;
    border-radius: 50%;
    animation: ${moveUpDown} 6s infinite ease-in-out;
    opacity: 0.5;
    filter: blur(2px);
  }

  /* 반응형 설정 */
  @media (max-width: 440px) {
    .circle {
      width: 62px;
      height: 62px;
      margin-bottom: 5px;
    }
  }

  @media (min-width: 441px) {
    .circle {
      width: 190px;
      height: 190px;
      margin-bottom: 20px;
    }
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      {/* 첫 번째 줄 */}
      <div
        className="column"
        style={{
          top: window.innerWidth <= 440 ? "180px" : "300px",
          left: window.innerWidth <= 440 ? "-10px" : "-30px",
          gap: window.innerWidth <= 440 ? "5px" : "20px",
        }}
      >
        <div className="circle" />
        <div className="circle" />
        <div
          className="circle"
          style={{
            opacity: window.innerWidth <= 440 ? "0.3" : "0.3",
          }}
        />
      </div>

      {/* 두 번째 줄 */}
      <div
        className="column"
        style={{
          bottom: window.innerWidth <= 440 ? "-25px" : "-100px",
          left: window.innerWidth <= 440 ? "90px" : "360px",
          gap: window.innerWidth <= 440 ? "5px" : "250px",
        }}
      >
        <div className="circle" />
        <div className="circle" />
      </div>

      {/* 세 번째 줄 */}
      <div
        className="column"
        style={{
          bottom: window.innerWidth <= 440 ? "280px" : "65%",
          right: window.innerWidth <= 440 ? "55px" : "400px",
          gap: window.innerWidth <= 440 ? "5px" : "20px",
        }}
      >
        <div className="circle" />
        <div
          className="circle"
          style={{
            opacity: window.innerWidth <= 440 ? "0.3" : "0.3",
          }}
        />
      </div>

      {/* 네 번째 줄 */}
      <div
        className="column"
        style={{
          top: window.innerWidth <= 440 ? "-9px" : "120px",
          right: window.innerWidth <= 440 ? "-15px" : "23px",
          gap: window.innerWidth <= 440 ? "5px" : "50px",
        }}
      >
        <div className="circle" />
        <div
          className="circle"
          style={{
            opacity: window.innerWidth <= 440 ? "0.3" : "0.3",
            marginBottom: window.innerWidth <= 440 ? "0" : "100px",
          }}
        />
        <div className="circle" />
      </div>
    </BackgroundContainer>
  );
};

export default Background;
