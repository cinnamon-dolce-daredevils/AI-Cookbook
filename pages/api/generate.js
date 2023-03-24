import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const ingredientsList = req.body.ingredients || '';
  if (ingredientsList.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid ingredient",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(ingredientsList),
      temperature: 0.6,
      max_tokens: 900,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(ingredientsList) {
  const capitalizedIngredients =
    ingredientsList[0].toUpperCase() + ingredientsList.slice(1).toLowerCase();
  return `Suggest meals with recipes that contain only, but not necessarily all, of these ingredients.

Ingredients: american cheese, mayo, turkey, white bread, tortilla, provalone.
Meals: sandwich, turkey wrap, grilled cheese
Ingredients: milk, cheese, eggs, four, sugar, salt
Meals: cake, cupcake, cookies
Ingredients: ${capitalizedIngredients}
Meals: `;
}


