import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchRandom } from "../../api";
import Logo from "../../imgs/Logo.png";
import ColorThief from "colorthief";
import { ReactComponent as SearchIcon } from "../../imgs/SearchIcon.svg";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 150px 40px 200px 40px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 40px;
    margin-bottom: 30px;
  }
`;

const Logos = styled.div`
  width: 50%;
  margin-bottom: 50px;
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
  background-color: ${(props) => props.bgColor || "#FFAA7C"};
  border: none;
  color: white;
  padding: 10px 20px;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 300;
  border-radius: 50px;
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
  height: 30px;
  border-bottom: 1px solid black;
  font-size: 24px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    font-size: 24px;
    outline: none;
    border: none;
    background: none;
    font-family: "116angmuburi";
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
  }
`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [mainColor, setMainColor] = useState("#FFAA7C");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRandomCocktail = async () => {
      try {
        const cocktail = await fetchRandom();
        setRandomCocktail(cocktail);

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = cocktail.strDrinkThumb;

        img.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
          const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
          setMainColor(rgbColor);
        };
      } catch (error) {
        console.error("Failed to fetch random cocktail:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    loadRandomCocktail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSeeRecipe = () => {
    if (randomCocktail && randomCocktail.idDrink) {
      navigate(`/detail/${randomCocktail.idDrink}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Logos>
        <img src={Logo} alt="Siply Logo" />
      </Logos>
      {randomCocktail && (
        <>
          <h2>today's cocktail</h2>
          <CocktailImage>
            <img
              src={randomCocktail.strDrinkThumb}
              alt={randomCocktail.strDrink}
            />
          </CocktailImage>
          <Button bgColor={mainColor} onClick={handleSeeRecipe}>
            See Recipe
          </Button>
        </>
      )}
      <SearchContainer>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name or Ingredient"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
        </Form>
      </SearchContainer>
    </Container>
  );
};

export default Home;
