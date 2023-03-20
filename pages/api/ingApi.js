const apiKey = '12b7e9bb35064303bdf958fe79ba7449';

export async function getRandomFoodTrivia() {
  const url = `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}
