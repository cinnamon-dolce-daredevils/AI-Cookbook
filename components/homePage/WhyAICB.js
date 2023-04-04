import { Grid, SvgIcon } from "@mui/material";
import React from "react";
import styles from "../../styles/index.module.css";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CelebrationIcon from "@mui/icons-material/Celebration";


export default function ReasonCards(props) {
	const { icon, reason, explanation } = props;

    const renderIcon =()=>{
        switch (icon) {
					case "kitchen":
						return <KitchenIcon />;
					case "time":
						return <ElectricBoltIcon />;
					case "health":
						return <FitnessCenterIcon />;
					case "fun":
						return <CelebrationIcon />;
					default:
						return null;
				}
    }

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<div className={styles.reasonCard}>
				{renderIcon()}
				<h3>{reason}</h3>
				<p>{explanation}</p>
			</div>
		</Grid>
	);
}
