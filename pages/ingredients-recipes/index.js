import Head from "next/head";
import { useState } from "react";
import styles from "../../styles/index.module.css";
import Link from "next/link";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useSession } from "@supabase/auth-helpers-react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)


import { useEffect } from "react";
import { callAutocompleteApi, fetchIngredientDetails } from "./ingredientApi";

import { Button } from "@mui/material";

import { createClient } from "@supabase/supabase-js";


export default function IngredientRecipe() {

  const [ingredientsInput, setIngredientsInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const [result, setResult] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  let toggled = false;
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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

if (session) {
  userId = session.user.id;
}

async function handleIngredientClick (ingredient) {
 setExpandedIngredient(ingredient)
}


  function closeExpandedView() {
    setExpandedIngredient(null);
  }

  async function handleSuggestionClick(suggestion) {
    setIngredientsInput("");
    setSuggestions([]);

    try {
      const ingredientDetails = await fetchIngredientDetails(suggestion.id);
      let fat = 0, calories = 0, protein = 0, carbs = 0;
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
            // handle unknown nutrient
            break;
        }
      }
      if (!userId) {
        console.log("user is not logged in");
        return;
      }
      const { error } = await supabase
        .from("pantry")
        .insert([{
          suggestion: [{
            id: ingredientDetails.id,
            name: ingredientDetails.name,
            calories: calories,
            fat: fat,
            protein: protein,
            carbs: carbs
          }],
          userId: userId
        }]);

      if (error) {
        console.log("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", ingredientDetails);
      }
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredientDetails,
      ]);
      setExpandedIngredient(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }


  async function onSubmit(event) {
    event.preventDefault();


    const ingredientsList = selectedIngredients.map((ingredient) => ingredient.name).join(", ");
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
        throw data.error || new Error(`Request failed with status: status ${response.status}`);
      }

      setResult(data.result);
      setIngredientsInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function fetchRecipe(recipe) {
    setSelectedRecipe("");
    setResult((prevState) => ({ ...prevState, isLoading: true }));
    const ingredientsList = selectedIngredients
    .map((ingredient) => ingredient.name)
    .join(", ");
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
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
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
    <div className={styles.body}>
      <Head>
        <title>AI Cookbook</title>
        <link rel="icon" href="/images/forkman-removebg.png" />
      </Head>

      <main className={styles.main}>
        <img src="/images/AICB_LogG.png" className={styles.icon} />
        <h3>Whatchu got in yo pantry?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter your ingredients"
            value={ingredientsInput}
            onChange={handleInputChange}
          />
          <Button type="submit">Generate Meals</Button>
        </form>
        <ul className={styles.suFatggestions}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
        <div className={styles.ingredientsList}>
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className={styles.ingredientItem}
              onClick={() => handleIngredientClick(ingredient)}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
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

{result &&
  !result.isLoading && typeof result === "string" && (
    <div className={styles.mealList}>
      {result.split(", ").map((recipe, index) => (
              <div
                key={index}
                className={styles.mealItem}
                onClick={() => fetchRecipe(recipe)}
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
          style={{ fontSize: "50px", width: "50px", color: isFavorite ? "red" : "grey" }}
          onClick={toggleFavorite}
        />
        <h4>{selectedRecipe}</h4>
      </div>
    )}

  
      <Link style={{textDecoration: 'none', color: 'white'}} href={"/"}>Return to Home</Link>

    </div>
  );
}
