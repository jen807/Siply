import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "10%",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}

*{
    box-sizing: border-box;
}

@font-face {
    font-family: '116angmuburi';
    src: url('/font/116angmuburi.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: '116angmuburi', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #F3EEF2;
    color: #333;
  }

img{
    display: block;
    width: 100%;
}

a{
    text-decoration: none;
}

`;
