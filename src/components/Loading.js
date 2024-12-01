import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Line1 from "../imgs/Line 5.svg";
import Line2 from "../imgs/Group 12.svg";
import Line3 from "../imgs/Group 13.svg";
import Background from "./Background";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f3f7;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LoadingText = styled.p`
  font-size: 40px;
  font-weight: 500;
  color: #333;
`;

const Loading = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Line1, Line2, Line3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000 / images.length);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
    <Background />
    <Container>
      <ImageWrapper>
        <img src={images[currentImage]} alt="Loading animation" />
      </ImageWrapper>
      <LoadingText>LOADING...</LoadingText>
    </Container>
    </>
  );
};

export default Loading;
