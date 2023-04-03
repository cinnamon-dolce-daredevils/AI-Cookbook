import Head from "next/head";
import { useState, useContext } from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import styles from '../../../styles/index.module.css'
export default function RecipeAI() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [result, setResult] = useState();
   let [isLightMode] = useContext(Context);
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setIngredientsInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function onRecipeClick(event, recipe) {
    event.preventDefault();
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe: recipe }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }



  return (
    <div className={styles.body}>
      <Head>
        <title>Pantry Popper</title>
        <link rel="icon" href="/images/forkman-removebg.png" />
      </Head>

      <main className={styles.main}>
        <h3>Whatchu got in yo pantry?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter your ingredients"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
          />
          <input type="submit" value="Generate meals" />
        </form>
        {result && (
          <div className={styles.result}>
            {result.split(', ').map((recipe, index) => (
              <Link key={index} href={`/recipes/${recipe}`}>
                {recipe}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Button href="/"></Button>
      <Typography sx={{color: isLightMode ? 'black' : 'white'}}>

        <Link style={{color: isLightMode ? 'black' : 'black'}} href={'/'}>Return to Home</Link>
      </Typography>
    </div>
  );
}
