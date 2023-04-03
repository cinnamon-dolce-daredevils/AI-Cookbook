import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';
import styles from '../styles/index.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { useTheme } from '@emotion/react';
import { Button, Container, Stack } from '@mui/material';
import TriviaSimpleGrow from '@/components/Trivia';
import { whyAICookbook } from '@/script/homeinfo';
import ReasonCards from '@/components/homePage/WhyAICB';

const Home = () => {
  const theme = useTheme();
  const [trivia, setTrivia] = useState("");
  const session = useSession();

  // useEffect(() => {
  //   const fetchTrivia = async () => {
  //     try {
  //       const trivia = await getRandomFoodTrivia();
  //       setTrivia(trivia);
  //     } catch (error) {
  //       console.error(error);
  //       alert(error.message);
  //     }
  //   };

  //   fetchTrivia();
  // }, []);


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
				<h1 style={{ color: "white" }}>
					Take the stress out of everyday cooking with AI
				</h1>
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
			<div>
				<h1 style={{ width: "100%", textAlign: "center", marginTop: "125px" }}>
					Why AI Cookbook?
				</h1>
				{"\n"}
				<Container>
					<div className={styles.reasons} direction='row'>
						{whyAICookbook.map((reason) => {
							return (
								<ReasonCards
									icon={reason.iconUrl}
									reason={reason.reason}
									explanation={reason.explanation}
								/>
							);
						})}
					</div>
				</Container>
			</div>
			<div className={styles.parallax}></div>
			<div className={styles.triviaBox}>
				<img
					src='/images/triviaIcon.png'
					style={{ width: "150px", marginBottom: "0" }}
				/>
				<h2 style={{ textAlign: "center" }}>
					Want to impress your friends and win your favorite bar's trivia night?{" "}
				</h2>
				<Container className={styles.triviaContainer}>
					<TriviaSimpleGrow trivia={trivia} />
					{/* ) : null} */}
				</Container>
			</div>
		</>
	);
}

export default Home;
