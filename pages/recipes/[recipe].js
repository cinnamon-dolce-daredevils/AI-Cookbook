import Head from "next/head";
import { useState, useEffect } from "react";

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Recipe() {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { recipe } = router.query;

  async function onLoad() {
    setIsLoading(true);
    try {
      const response = await fetch("../api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe: recipe,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (recipe) {
      onLoad();
    }
  }, [recipe]);

  return (
    <div className={styles.body}>
      <Head>
        <title>{recipe}</title>
        <link rel="icon" href="/images/forkman-removebg.png" />
      </Head>

      <main className={styles.main}>
        <img src="/images/forkman-removebg.png" className={styles.icon} />
        <Link href={{
          pathname: '/recipes'}}>
          <div className={styles.back}> Choose Another Recipe</div>
        </Link>

        <h3>{isLoading ? 'Loading...' : recipe}</h3>
        {isLoading ? (
          <img src="/images/fridge.gif" />
        ) : (
          <h4 className={styles.recipe}>{result}</h4>
        )}
      </main>
    </div>
  );
}
