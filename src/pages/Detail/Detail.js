import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { fetchById } from "../../api";
import Logo from "../../imgs/Logo.png";
import Loading from "../../components/Loading";
import BackArrow from "../../imgs/BackArrow.png";
import Background from "../../components/Background";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  font-family: "116angmuburi";
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
  position: relative;

  img {
    width: 100px;
  }

  .arrow {
    position: absolute;
    top: 8px;
    left: 50px;
    img {
      width: 10px;
    }
  }
`;

const CocktailImage = styled.div`
  width: 230px;
  height: 230px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 70px;
`;

const IngredientsList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 10px;
`;

const IngredientCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

  .background-circle {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 70px;
    height: 70px;
    background-color: #d9b9d2;
    border-radius: 50%;
    z-index: 1;
  }

  .ingredient-img {
    position: relative;
    z-index: 2;
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .measure {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 26px;
    color: #555;
  }

  .name {
    font-size: 20px;
    color: #333;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const data = await fetchById(id);
        if (data) {
          setCocktail(data);
        } else {
          console.error("No cocktail found with this ID");
        }
      } catch (err) {
        console.error("Error fetching cocktail details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCocktailDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ name: ingredient, measure });
    }
  }

  return (
   <>
    <Background />
    <Container>
      <Header>
        <Link to="/" className="arrow">
          <img src={BackArrow} alt="backarrow" />
        </Link>
        <Link to="/">
          <img src={Logo} alt="Siply Logo" />
        </Link>
      </Header>
      <CocktailImage>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      </CocktailImage>
      <Title>{cocktail.strDrink}</Title>
      <IngredientsList>
        {ingredients.map((item, index) => (
          <IngredientCard key={index}>
            <div className="background-circle"></div>
            <img
              className="ingredient-img"
              src={`https://www.thecocktaildb.com/images/ingredients/${item.name}-Small.png`}
              alt={item.name}
            />
            <span className="measure">{item.measure || "As needed"}</span>
            <span className="name">{item.name}</span>
          </IngredientCard>
        ))}
      </IngredientsList>
    </Container>
   </>
  );
};

export default Detail;
