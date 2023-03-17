const apiKey = "12b7e9bb35064303bdf958fe79ba7449";

export async function callAutocompleteApi(input) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${encodeURIComponent(
      input
    )}&number=10&metaInformation=true`
  );

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchIngredientDetails(id) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=100&unit=grams`
  );

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}
