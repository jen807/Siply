import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { fetchByName, fetchByIngredient } from "../../api";
import Logo from "../../imgs/Logo.png";
import { ReactComponent as SearchIcon } from "../../imgs/SearchIcon.svg";
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  img {
    width: 100px;
    margin-bottom: 20px;
  }
`;

const SearchBar = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 0;
  margin-bottom: 20px;
  border-bottom: 1px solid black;

  input {
    width: 70%;
    font-size: 24px;
    padding: 10px;
    border: none;
    background: none;
    outline: none;
    font-family: "116angmuburi";
  }

  &::placeholder {
    padding: 10px;
    font-size: 24px;
  }

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    border: none;
    background-color: #f3eef2;
    font-family: "116angmuburi";
    color: #333;
    cursor: pointer;
    font-size: 20px;
    border-bottom: 2px solid transparent;

    &.active {
      border-bottom: 2px solid #ffaa7c;
      font-weight: bold;
    }
  }
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px;
  background-color: #f9f6f8;
  border-radius: 60px 0px 60px 60px;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  flex: 1;
  text-align: left;

  h3 {
    font-size: 28px;
    font-weight: 550;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

  p {
    font-size: 18px;
    color: #666;
  }
`;

const SeeRecipe = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 18px;
  font-weight: 500;
  color: #5f1f52;
  cursor: pointer;
`;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameResults, setNameResults] = useState([]);
  const [ingredientResults, setIngredientResults] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("name");
  const [newQuery, setNewQuery] = useState("");
  const navigate = useNavigate();

  const query = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const fetchedNameResults = await fetchByName(query);
        setNameResults(fetchedNameResults || []);

        const fetchedIngredientResults = await fetchByIngredient(query);
        setIngredientResults(fetchedIngredientResults || []);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(newQuery)}`);
      setSearchParams({ query: newQuery });
      setNewQuery("");
    }
  };

  const renderNameResults = (results) => {
    if (!Array.isArray(results) || results.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <ResultsList>
        {results.map((cocktail) => (
          <Card
            onClick={() => navigate(`/detail/${cocktail.idDrink}`)}
            key={cocktail.idDrink}
          >
            <Thumbnail>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </Thumbnail>
            <Info>
              <h3>{cocktail.strDrink}</h3>
              <p>Main Ingredient: {cocktail.strIngredient1 || "Unknown"}</p>
            </Info>
            <SeeRecipe onClick={() => navigate(`/detail/${cocktail.idDrink}`)}>
              See Recipe
            </SeeRecipe>
          </Card>
        ))}
      </ResultsList>
    );
  };

  const renderIngredientResults = (results) => {
    if (!Array.isArray(results) || results.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <ResultsList>
        {results.map((cocktail) => (
          <Card key={cocktail.idDrink}
          onClick={() => navigate(`/detail/${cocktail.idDrink}`)}>
            <Thumbnail>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </Thumbnail>
            <Info>
              <h3>{cocktail.strDrink}</h3>
            </Info>
            <SeeRecipe onClick={() => navigate(`/detail/${cocktail.idDrink}`)}>
              See Recipe
            </SeeRecipe>
          </Card>
        ))}
      </ResultsList>
    );
  };

  return (
    <>
      <Background />
      <Container>
        <Header>
          <Link to="/">
            <img src={Logo} alt="Siply Logo" />
          </Link>
          <h3></h3>
        </Header>
        <SearchBar onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter name or Ingredient"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
          />
          <SearchIcon onClick={handleSearch} />
        </SearchBar>
        <Tabs>
          <button
            className={activeTab === "name" ? "active" : ""}
            onClick={() => setActiveTab("name")}
          >
            By Name
          </button>
          <button
            className={activeTab === "ingredient" ? "active" : ""}
            onClick={() => setActiveTab("ingredient")}
          >
            By Ingredient
          </button>
        </Tabs>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {activeTab === "name"
          ? renderNameResults(nameResults)
          : renderIngredientResults(ingredientResults)}
      </Container>
    </>
  );
};

export default Search;
