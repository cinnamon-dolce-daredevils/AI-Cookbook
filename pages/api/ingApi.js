const apiKey = '528d6e974d124631a86eba6bb6d97794';
// const apiKey = '2513e401e1424711aabbf36076908290';
// const apiKey = '12b7e9bb35064303bdf958fe79ba7449';
// const apiKey = '4dc4e6d25bc644deb1222169d40f5ed1';


export async function getRandomFoodTrivia() {
  const url = `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}
