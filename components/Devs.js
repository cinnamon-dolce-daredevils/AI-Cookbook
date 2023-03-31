import React from 'react'
import styles from '../styles/aboutPage.module.css'
import avatar from'../public/images/ryanpic.png'
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';





export default function SimpleGrow(props) {
    const theme = useTheme()
	const [checked, setChecked] = React.useState(false);
    const {name, description, linkedIn, gitHub, avatar} = props
    
	const handleClick = () => {
		setChecked((prev) => !prev);
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
				<Avatar alt={name} src={avatar} sx={{ width: 100, height: 100 }} />
				<Typography variant='h5' sx={{ mr: 1 }}>
					{name}
				</Typography>
			</Box>
			<Box
				sx={
					checked
						? { display: "flex", flexDirection: "column" }
						: { display: "none" }
				}
			>
				<Grow in={checked}>
					<Typography variant='body1' sx={{ p: 2 }}>
						{description}
					</Typography>
				</Grow>
				{/* Conditionally applies the timeout prop to change the entry speed. */}
				<Grow
					in={checked}
					style={{ transformOrigin: "0 0 0" }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Box
						variant='body1'
						sx={{
							p: 2,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Link href={linkedIn} sx={{ mr: 2 }}>
							<FontAwesomeIcon
								icon={faLinkedin}
								style={{
									fontSize: "2em",
									padding: 1,
									color: theme.palette.mode === "dark" ? "white" : "initial",
								}}
							/>
						</Link>{" "}
						<Link href={gitHub}>
							<FontAwesomeIcon
								icon={faGithub}
								style={{
									fontSize: "2em",
									color: theme.palette.mode === "dark" ? "white" : "initial",
								}}
							/>
						</Link>
					</Box>
				</Grow>
			</Box>
		</Box>
	);
}