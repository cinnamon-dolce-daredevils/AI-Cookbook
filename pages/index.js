import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';
import styles from '../styles/index.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { useTheme } from '@emotion/react';
import { Button, Container } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const [trivia, setTrivia] = useState("");
  const session = useSession();

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const trivia = await getRandomFoodTrivia();
        setTrivia(trivia);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchTrivia();
  }, []);


  return (
		<>
			<div className={styles.container}>
				<img
					src={
						// theme.palette.mode === "dark"
						"/images/AICB_LogoW.png"
						// : "/images/AICB_Logo.png"
					}
					className={styles.icon}
				/>

				{session ? (
					<Link
						style={{ textDecoration: "none", color: "white" }}
						href={"/ingredients-recipes"}
					>
						<Button
							sx={{
								backgroundColor: theme.palette.secondary.main,
								color: theme.palette.common.white,
								margin: "40px",
								mt: 3,
							}}
						>
							Add Ingredients
						</Button>
					</Link>
				) : (
					<>
						<h3> Please Sign up or Login first!</h3>
						<Link style={{ textDecoration: "none" }} href={"/profile"}>
							<Button
								sx={{
									color: "white",
									backgroundColor: theme.palette.secondary.main,
									textDecoration: "none",
									margin: "40px",
								}}
								variant='contained'
							>
								{" "}
								Signup/Login
							</Button>
						</Link>
					</>
				)}
			</div>
			<div className={styles.triviaBox}>
				<Container className={styles.triviaContainer}>
					{/* <img src="/images/cereal.png" className={styles.cereal} /> */}
					{/* {trivia ? ( */}
					<p
						style={{
							color: "white",
						}}
						className={styles.trivia}
					>
						{/* {trivia} */}
						trivia replacement
					</p>
					{/* ) : null} */}
					<div>
						What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
						printing and typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type
						specimen book. It has survived not only five centuries, but also the
						leap into electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of Letraset sheets
						containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem
						Ipsum. Why do we use it? It is a long established fact that a reader
						will be distracted by the readable content of a page when looking at
						its layout. The point of using Lorem Ipsum is that it has a
						more-or-less normal distribution of letters, as opposed to using
						'Content here, content here', making it look like readable English.
						Many desktop publishing packages and web page editors now use Lorem
						Ipsum as their default model text, and a search for 'lorem ipsum'
						will uncover many web sites still in their infancy. Various versions
						have evolved over the years, sometimes by accident, sometimes on
						purpose (injected humour and the like). Where does it come from?
						Contrary to popular belief, Lorem Ipsum is not simply random text.
						It has roots in a piece of classical Latin literature from 45 BC,
						making it over 2000 years old. Richard McClintock, a Latin professor
						at Hampden-Sydney College in Virginia, looked up one of the more
						obscure Latin words, consectetur, from a Lorem Ipsum passage, and
						going through the cites of the word in classical literature,
						discovered the undoubtable source. Lorem Ipsum comes from sections
						1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
						of Good and Evil) by Cicero, written in 45 BC. This book is a
						treatise on the theory of ethics, very popular during the
						Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
						amet..", comes from a line in section 1.10.32. The standard chunk of
						Lorem Ipsum used since the 1500s is reproduced below for those
						interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
						Malorum" by Cicero are also reproduced in their exact original form,
						accompanied by English versions from the 1914 translation by H.
						Rackham.
					</div>
				</Container>
			</div>
		</>
	);
}

export default Home;
