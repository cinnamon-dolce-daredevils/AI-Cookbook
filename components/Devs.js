import React from 'react'
import styles from '../styles/aboutPage.module.css'
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Typography } from '@mui/material';




export default function SimpleGrow(props) {
	const [checked, setChecked] = React.useState(false);
    const {name, description, linkedIn, gitHub} = props
    
	const handleClick = () => {
		setChecked((prev) => !prev);
	};

	return (
		<Box sx={{ height: 'auto'}}>
			<Box
				sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={handleClick}
			>
				<Typography variant='h5' sx={{ mr: 1 }}>
					{name}
				</Typography>
			</Box>
			<Box sx={checked?{display: "flex", flexDirection: "column" }:{display:'none'}}>
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
					<Typography variant='body1' sx={{ p: 2 }}>
						<Link href={linkedIn}>
							<FontAwesomeIcon icon={faLinkedin} />
						</Link>
						{" "}
						<Link href={gitHub}>
							<FontAwesomeIcon icon={faGithub} />
						</Link>
					</Typography>
				</Grow>
			</Box>
		</Box>
	);
}