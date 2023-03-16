import { Configuration, OpenAIApi } from "openai";
import recipe from "../recipes/[recipe]";
import { useRouter } from 'next/router';


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

  try {
    const recipe = req.body.recipe || '';
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateRecipe(recipe),
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

function generateRecipe(recipe) {
    return `Generate a detailed recipe for ${recipe} only send the instructions, you do not need to send the ingredients`;
  }
  
  