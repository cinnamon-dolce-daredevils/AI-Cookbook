import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/index.module.css";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReactMarkdown from "react-markdown";
import { useSelectedPersonality } from "../../components/useSelectedPersonality";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import {
  callAutocompleteApi,
  fetchIngredientDetails,
} from "../api/ingredientApi";
import PersistentDrawerLeft from "@/components/drawer/Leftdrawer";
import { textToSpeech } from "../textToSpeech";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function IngredientRecipe({ data }) {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { selectedPersonality, handleChangePersonality } =
    useSelectedPersonality();
  const [ingredientNames, setIngredientNames] = useState([]);
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const [result, setResult] = useState();

  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorites = async (selectedRecipe, userId) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert([{ selectedRecipe, userId }]);
      if (error) throw error;
    } catch (error) {
      console.log("Error inserting into favorites:", error.message);
    }
  };
  const toggleFavorite = async (selectedRecipe) => {
    try {
      if (isFavorite) {
        const { data, error } = await supabase
          .from("favorites")
          .delete()
          .match({ selectedRecipe, userId });
        if (error) throw error;
      } else {
        await addToFavorites(selectedRecipe, userId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error toggling favorite:", error.message);
    }
  };

  const [audioUrl, setAudioUrl] = useState(null);

const playSelectedRecipe = async (currentVoiceId) => {
  try {
    const audioBlob = await textToSpeech(selectedRecipe, currentVoiceId.toString());
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    }
  } catch (error) {
    console.error("Error playing the recipe:", error);
  }
};


  useEffect(() => {
    if (selectedRecipe) {
      fetchRecipe(selectedRecipe, selectedPersonality);
    }
  }, [selectedPersonality]);

  async function handleInputChange(event) {
    const input = event.target.value;
    setIngredientsInput(input);

    if (input.length >= 3) {
      try {
        const autocompleteResults = await callAutocompleteApi(input);
        setSuggestions(autocompleteResults);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      setSuggestions([]);
    }
  }

  const session = useSession();
  let userId = null;

  // sets the userId to the person who is signed in
  if (session) {
    userId = session.user.id;
  }

  async function handleIngredientClick(ingredient) {
    setExpandedIngredient(ingredient);
  }

  function closeExpandedView() {
    setExpandedIngredient(null);
  }

  async function handleSuggestionClick(suggestion) {
    setIngredientsInput("");
    setSuggestions([]);

    try {
      const ingredientDetails = await fetchIngredientDetails(suggestion.id);
      let fat = 0,
        calories = 0,
        protein = 0,
        carbs = 0;
      for (let nutrient of ingredientDetails.nutrition.nutrients) {
        switch (nutrient.name) {
          case "Fat":
            fat = nutrient.amount;
            break;
          case "Calories":
            calories = nutrient.amount;
            break;
          case "Protein":
            protein = nutrient.amount;
            break;
          case "Carbohydrates":
            carbs = nutrient.amount;
            break;
          default:
            break;
        }
      }
      if (!userId) {
        console.error("user is not logged in");
        return;
      }
      const { error } = await supabase.from("pantry").insert([
        {
          suggestion: [
            {
              id: ingredientDetails.id,
              name: ingredientDetails.name,
              calories: calories,
              fat: fat,
              protein: protein,
              carbs: carbs,
              image: ingredientDetails.image,
            },
          ],
          userId: userId,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
      }

      // Update the ingredientNames state here
      setIngredientNames((prevIngredientNames) => [
        ...prevIngredientNames,
        ingredientDetails.name,
      ]);

      setExpandedIngredient(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { data, error: existingError } = await supabase
      .from("pantry")
      .select("suggestion")
      .eq("userId", userId);

    if (existingError) {
      console.error("Error fetching data:", existingError);
      return;
    }

    const ingredientNames = data.map(
      (suggestion) => suggestion.suggestion[0].name
    );

    const ingredientsList = ingredientNames.join(", ");

    if (!ingredientsList) {
      alert("Please select at least one ingredient.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientsList }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status: status ${response.status}`)
        );
      }

      setResult(data.result);
      setIngredientsInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function fetchRecipe(recipe, selectedPersonality) {
    const { data: ingredientsData, error: existingError } = await supabase
      .from("pantry")
      .select("suggestion")
      .eq("userId", userId);

    if (existingError) {
      console.error("Error fetching data:", existingError);
      return;
    }
    setSelectedRecipe("");
    setResult((prevState) => ({ ...prevState, isLoading: true }));
    const ingredientNames = ingredientsData.map(
      (suggestion) => suggestion.suggestion[0].name
    );
    const ingredientsList = ingredientNames.join(", ");
    if (!ingredientsList) {
      alert("Please select at least one ingredient.");
      return;
    }

    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsList,
          selectedRecipe: recipe,
          personality: selectedPersonality,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setSelectedRecipe(data.result);
      setResult((prevState) => ({ ...prevState, isLoading: false }));
    } catch (error) {
      console.error(error);
      alert(error.message);
      setResult((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  return (
    <>
      <PersistentDrawerLeft ingredientNames={ingredientNames} />
      <div className={styles.body}>
        <Head>
          <title>AI Cookbook</title>
          <link rel="icon" href="images/AICB_TopG-trimmy.png" />
        </Head>

        <main className={styles.main}>
          <h3>Whatchu got in yo pantry?</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="ingredients"
              placeholder="Enter your ingredients"
              value={ingredientsInput}
              onChange={handleInputChange}
            />
            <Button variant="contained" type="submit">
              Generate Meals
            </Button>
          </form>
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        </main>

        {expandedIngredient && (
          <div className={styles.ingredientDetails} onClick={closeExpandedView}>
            <p>{expandedIngredient.name}</p>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${expandedIngredient.image}`}
              alt={expandedIngredient.name}
            />
            {expandedIngredient.nutrition &&
              expandedIngredient.nutrition.nutrients && (
                <>
                  <p>
                    Calories:{" "}
                    {expandedIngredient.nutrition.nutrients.find(
                      (n) => n.name === "Calories"
                    )?.amount || "N/A"}{" "}
                    kcal
                  </p>
                  <p>
                    Carbs:{" "}
                    {expandedIngredient.nutrition.nutrients.find(
                      (n) => n.name === "Carbohydrates"
                    )?.amount || "N/A"}{" "}
                    g
                  </p>
                  <p>
                    Fat:{" "}
                    {expandedIngredient.nutrition.nutrients.find(
                      (n) => n.name === "Fat"
                    )?.amount || "N/A"}{" "}
                    g
                  </p>
                  <p>
                    Protein:{" "}
                    {expandedIngredient.nutrition.nutrients.find(
                      (n) => n.name === "Protein"
                    )?.amount || "N/A"}{" "}
                    g
                  </p>
                </>
              )}
          </div>
        )}

        {result && typeof result === "string"}

        {result && !result.isLoading && typeof result === "string" && (
          <div className={styles.mealList}>
            {result.split(", ").map((recipe, index) => (
              <div
                key={index}
                className={styles.mealItem}
                onClick={(event) => fetchRecipe(recipe, selectedPersonality)}
              >
                {recipe}
              </div>
            ))}
          </div>
        )}

        {result && result.isLoading && (
          <>
            <div className={styles.loadingOverlay}>
              <div className={styles.loading}>
                <h1>Loading...</h1>
                <img src="/images/fridge.gif" />
              </div>
            </div>
          </>
        )}
        {selectedRecipe && (
          <div className={styles.recipe}>
            <FavoriteIcon
              className={styles.favorite}
              style={{
                fontSize: "50px",
                width: "50px",
                color: isFavorite ? "red" : "grey",
              }}
              onClick={() => {
                toggleFavorite(selectedRecipe);
            }}
            />
            <div className={styles.audio} >
                <button onClick={playSelectedRecipe}>Play Recipe</button>
            {audioUrl && (
                <audio controls src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
            </div>
            {isFavorite && <p>Recipe added to favorites!</p>}
            <ReactMarkdown>{selectedRecipe}</ReactMarkdown>
          </div>
        )}

        <Link style={{ textDecoration: "none", color: "white" }} href={"/"}>
          Return to Home
        </Link>
      </div>
    </>
  );
}
