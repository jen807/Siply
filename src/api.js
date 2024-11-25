const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
export const fetchRandom = async () => {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.drinks[0];
};

export const fetchByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error fetching data by name:", error);
    return [];
  }
};

export const fetchByIngredient = async (ingredient) => {
  const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks[0] || null;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    return null;
  }
};
