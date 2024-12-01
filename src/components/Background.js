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

const circleDelays = [
  "0s",
  "0.5s",
  "1s",
  "1.5s",
  "2s",
  "2.5s",
  "3s",
  "3.5s",
  "4s",
];

const Background = () => {
  return (
    <BackgroundContainer>
      {[
        {
          top: window.innerWidth <= 440 ? "180px" : "100px",
          left: window.innerWidth <= 440 ? "-10px" : "-30px",
          gap: window.innerWidth <= 440 ? "5px" : "20px",
          count: 3,
        },
        {
          bottom: window.innerWidth <= 440 ? "-25px" : "-100px",
          left: window.innerWidth <= 440 ? "90px" : "360px",
          gap: window.innerWidth <= 440 ? "5px" : "250px",
          count: 2,
        },
        {
          bottom: window.innerWidth <= 440 ? "280px" : "65%",
          right: window.innerWidth <= 440 ? "55px" : "400px",
          gap: window.innerWidth <= 440 ? "5px" : "20px",
          count: 2,
        },
        {
          top: window.innerWidth <= 440 ? "-9px" : "120px",
          right: window.innerWidth <= 440 ? "-15px" : "23px",
          gap: window.innerWidth <= 440 ? "5px" : "50px",
          count: 3,
        },
      ].map((column, columnIndex) => (
        <div
          className="column"
          key={columnIndex}
          style={{
            ...column,
          }}
        >
          {Array.from({ length: column.count }).map((_, circleIndex) => (
            <div
              className="circle"
              key={circleIndex}
              style={{
                animationDelay: circleDelays[columnIndex * 3 + circleIndex] || "0s",
              }}
            />
          ))}
        </div>
      ))}
    </BackgroundContainer>
  );
};

export default Background;
