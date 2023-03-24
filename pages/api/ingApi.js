


export async function getRandomFoodTrivia() {
  const url = `https://api.spoonacular.com/food/trivia/random`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_APIKEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}
