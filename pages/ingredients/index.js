import Head from "next/head";
import { useState, useEffect } from "react";
import styles from '../../styles/index.module.css';
import Link from "next/link";


const apiKey = "2513e401e1424711aabbf36076908290";



async function callAutocompleteApi(input) {
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
  
  

  async function fetchIngredientDetails(id) {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=100&unit=grams`
    );
  
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  
  
  
  

export default function AddIng() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [expandedIngredient, setExpandedIngredient] = useState(null);

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

  function handleIngredientClick(ingredient) {
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
  
  
  

  return (
    <div className={styles.body}>
      <Head>
        <title>AI Cookbook</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>

      <main className={styles.main}>
        <img src="/images/favicon.ico" className={styles.icon} />
        <h3>Whatchu got in yo pantry?</h3>
        <form>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter your ingredients"
            value={ingredientsInput}
            onChange={handleInputChange}
          />
        </form>
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
        {selectedIngredient && (
          <>
            <p>{selectedIngredient.name}</p>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${selectedIngredient.image}`}
              alt={selectedIngredient.name}
            />
            {selectedIngredient.nutrition &&
              selectedIngredient.nutrition.nutrients && (
                <>
                  <p>
                    Calories:{' '}
                    {selectedIngredient.nutrition.nutrients.find(
                      (n) => n.name === 'Calories'
                    )?.amount || 'N/A'}{' '}
                    kcal
                  </p>
                  <p>
                    Carbs:{' '}
                    {selectedIngredient.nutrition.nutrients.find(
                      (n) => n.name === 'Carbohydrates'
                    )?.amount || 'N/A'}{' '}
                    g
                  </p>
                  <p>
                    Fat:{' '}
                    {selectedIngredient.nutrition.nutrients.find(
                      (n) => n.name === 'Fat'
                    )?.amount || 'N/A'}{' '}
                    g
                  </p>
                  <p>
                    Protein:{' '}
                    {selectedIngredient.nutrition.nutrients.find(
                      (n) => n.name === 'Protein'
                    )?.amount || 'N/A'}{' '}
                    g
                  </p>
                </>
              )}
          </>
        )}
      </main>
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
                  Calories:{' '}
                  {expandedIngredient.nutrition.nutrients.find(
                    (n) => n.name === 'Calories'
                  )?.amount || 'N/A'}{' '}
                  kcal
                </p>
                <p>
                  Carbs:{' '}
                  {expandedIngredient.nutrition.nutrients.find(
                    (n) => n.name === 'Carbohydrates'
                  )?.amount || 'N/A'}{' '}
                  g
                </p>
                <p>
                  Fat:{' '}
                  {expandedIngredient.nutrition.nutrients.find(
                    (n) => n.name === 'Fat'
                  )?.amount || 'N/A'}{' '}
                  g
                </p>
                <p>
                  Protein:{' '}
                  {expandedIngredient.nutrition.nutrients.find(
                    (n) => n.name === 'Protein'
                  )?.amount || 'N/A'}{' '}
                  g
                </p>
              </>
            )}
        </div>
      )}
      <Link href={'/'}>Return to Home</Link>
    </div>
  );
}
