import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchByName, fetchByIngredient } from "../../api"; // API 가져오기
import Logo from "../../imgs/Logo.png";
import { ReactComponent as SearchIcon } from "../../imgs/SearchIcon.svg";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
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

  h1 {
    font-size: 24px;
    font-weight: 700;
  }
`;

const SearchBar = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid black;

  input {
    width: 70%;
    font-size: 18px;
    padding: 10px;
    border: none;
    background: none;
    outline: none;
    font-family: "116angmuburi";
    margin-right: 10px;
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
    color: #333;
    cursor: pointer;
    font-size: 16px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: #ffaa7c;
    }

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
  padding: 15px;
  background-color: #f8f4f4;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
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
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

const SeeRecipe = styled.button`
  background-color: #ffaa7c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff884c;
  }
`;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // URL에서 검색 쿼리 추출
  const [nameResults, setNameResults] = useState([]);
  const [ingredientResults, setIngredientResults] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("name"); // 현재 선택된 탭 ("name" or "ingredient")
  const [newQuery, setNewQuery] = useState(""); // 새로운 검색어
  const navigate = useNavigate();

  const query = searchParams.get("query"); // 검색어 가져오기

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // 검색어가 없으면 실행 안 함
      try {
        // 이름 검색 결과
        const fetchedNameResults = await fetchByName(query);
        setNameResults(fetchedNameResults || []);

        // 재료 검색 결과
        const fetchedIngredientResults = await fetchByIngredient(query);
        setIngredientResults(fetchedIngredientResults || []);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchResults();
  }, [query]); // query가 변경될 때마다 실행

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(newQuery)}`); // 새 검색어로 페이지 이동
      setSearchParams({ query: newQuery }); // URL 업데이트
      setNewQuery(""); // 입력 초기화
    }
  };

  const renderResults = (results) => {
    if (!Array.isArray(results) || results.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <ResultsList>
        {results.map((cocktail) => (
          <Card key={cocktail.idDrink}>
            <Thumbnail>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </Thumbnail>
            <Info>
              <h3>{cocktail.strDrink}</h3>
              <p>Main Ingredient: {cocktail.strIngredient1 || "Unknown"}</p>
            </Info>
            <SeeRecipe>See Recipe</SeeRecipe>
          </Card>
        ))}
      </ResultsList>
    );
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="Siply Logo" />
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
        ? renderResults(nameResults)
        : renderResults(ingredientResults)}
    </Container>
  );
};

export default Search;
