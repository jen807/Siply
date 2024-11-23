const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
export const fetchRandom = async () => {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.drinks[0];
};

export const fetchByName = async (name) => {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.drinks;
};

export const fetchByIngredient = async (ingredient) => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.drinks;
};