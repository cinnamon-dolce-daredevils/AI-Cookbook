import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/index.module.css";

const apiKey = "2513e401e1424711aabbf36076908290";

async function callAutocompleteApi(input) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${encodeURIComponent(
      input
    )}&number=10`
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

  function handleSuggestionClick(suggestion) {
    setIngredientsInput(suggestion.name);
    setSuggestions([]);
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Pantry Popper</title>
        <link rel="icon" href="/images/forkman-removebg.png" />
      </Head>

      <main className={styles.main}>
        <img src="/images/forkman-removebg.png" className={styles.icon} />
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
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      </main>
      <Link href={"/"}>Return to Home</Link>
    </div>
  );
}
