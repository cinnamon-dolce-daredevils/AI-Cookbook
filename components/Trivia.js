import React from "react";
import styles from "../styles/aboutPage.module.css";
import avatar from "../public/images/ryanpic.png";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Link, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getRandomFoodTrivia } from "@/pages/api/ingApi";

export default function TriviaSimpleGrow(props) {
	const theme = useTheme();
	const [checked, setChecked] = React.useState(false);
     const [trivia, setTrivia] = React.useState("");
     const [isFetchingTrivia, setIsFetchingTrivia] = React.useState(false);
	// const { trivia } = props;

const handleClick = async () => {
	if (!isFetchingTrivia) {
		setIsFetchingTrivia(true);
		setChecked((prev) => !prev);
		try {
			const trivia = await getRandomFoodTrivia();
			setTrivia(trivia);
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
		setIsFetchingTrivia(false);
	}
};
	

	return (
		<Box sx={{ height: "auto" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					flexDirection: "column",
                    
				}}
				onClick={handleClick}
			>
				<Button
					variant='contained'
					sx={{ m: 1, backgroundColor: theme.palette.secondary.main }}
				>
					Click for Food Trivia!
				</Button>
			</Box>
			<Box
				sx={
					checked
						? { display: "flex", alignItems: "center" }
						: { display: "none" }
				}
			>
				<Grow in={checked}>
					<Typography variant='body1' sx={{ p: 2 }}>
						dummy trivia
						{/* {trivia} */}
					</Typography>
				</Grow>
				{/* Conditionally applies the timeout prop to change the entry speed. */}
			</Box>
		</Box>
	);
}
