import { Configuration, OpenAIApi } from "openai";
import { handleChangePersonality } from '../../components/drawer/AccountSettings'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const ingredientsList = req.body.ingredients || '';
  const selectedRecipe = req.body.selectedRecipe || '';
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
      prompt: generatePrompt(ingredientsList, selectedRecipe, req.body.personality),
      temperature: 0.6,
      max_tokens: 900,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(ingredientsList, selectedRecipe, personality) {
  const capitalizedIngredients =
    ingredientsList[0].toUpperCase() + ingredientsList.slice(1).toLowerCase();
  return `Write a real recipe for ${selectedRecipe} using only, but not necesarily all the following ingredients: ${capitalizedIngredients}, table salt, black pepper, cooking oil, water and include the calories, fat, protein, and carbs for the meal, Make sure to present it in markdown format. Write the recipe the way ${personality} talks and don't be afraid to exaggerate it if need be. Make sure to write the instructions for the recipe as if they were being spoken by ${personality}. Say the recipe is written by them, and make sure to use their vernacular, style, language, and mannerisms.`;
}

