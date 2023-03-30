import React from 'react'

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from '@mui/material';




export default function SimpleGrow(props) {
	const [checked, setChecked] = React.useState(false);
    const {name, description, linkedIn, gitHub} = props
    
	const handleClick = () => {
		setChecked((prev) => !prev);
	};

	return (
		<Box sx={{ height: 180 }}>
			<Box
				sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={handleClick}
			>
				<Typography variant='h5' sx={{ mr: 1 }}>
					{name}
				</Typography>
			</Box>
			<Box sx={{ display: "flex" , flexDirection:'column'}}>
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
						LinkedinIcon: {linkedIn}
                        <br/>
                        GitHubIcon: {gitHub}
					</Typography>
				</Grow>
			</Box>
		</Box>
	);
}