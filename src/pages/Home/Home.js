
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchRandom } from "../../api";
import Logo from "../../imgs/Logo.png"

const Container = styled.div`
  max-width: 400px;
margin: 0 auto;
padding: 80px 40px;
text-align: center;
border-radius: 10px;
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;

h2{
    font-size: 40px;
    margin-bottom: 30px;
}
`;

const Logos = styled.div`
width: 140px;
height: 45px;
margin-bottom: 50px;
background-image: url(${Logo});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;

const CocktailImage = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
overflow: hidden;
margin: 0 auto 30px;
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

const Button = styled.button`
background-color: ${(props) => props.bgColor || "#f5a623"};
border: none;
color: white;
padding: 10px 20px;
font-size: 16px;
font-weight: 300;
border-radius: 20px;
cursor: pointer;
margin-bottom: 30px;
`;

const SearchContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`;

const Form = styled.form`
width: 100%;
border-bottom: 1px solid black;
padding: 10px;
font-size: 24px;
input{
width: 70%;
margin-right: 10px;
font-size: 22px;
outline: none;
all: unset;
}
`;

 const Home = () => {
            const [randomCocktail, setRandomCocktail] = useState(null);
            const [mainColor, setMainColor] = useState("#f5a623");
          
            useEffect(() => {
              const loadRandomCocktail = async () => {
                try {
                  const cocktail = await fetchRandom();
                  setRandomCocktail(cocktail);
          
                  const img = new Image();
                  img.src = cocktail.strDrinkThumb;
                  img.crossOrigin = "Anonymous";
                  img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const pixelData = ctx.getImageData(0, 0, 1, 1).data;
                    const extractedColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
                    setMainColor(extractedColor);
                  };
                } catch (error) {
                  console.error("Failed to fetch random cocktail:", error);
                }
              };
          
              loadRandomCocktail();
            }, []);
          
            return (
              <Container>
                <Logos/>
                {randomCocktail && (
                  <>
                    <h2>today's cocktail</h2>
                    <CocktailImage>
                      <img
                        src={randomCocktail.strDrinkThumb}
                        alt={randomCocktail.strDrink}
                      />
                    </CocktailImage>
                    <Button bgColor={mainColor}>See Recipe</Button>
                  </>
                )}
                <SearchContainer>
                  <Form>
                    <input type="text" placeholder="Enter name or Ingredient" />
                  </Form>
                </SearchContainer>
              </Container>
            );
          };
          
          export default Home;
