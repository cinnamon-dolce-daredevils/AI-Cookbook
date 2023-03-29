import {Grid2} from '@mui/material/Unstable_Grid2';
import { Grid} from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import styles from '../../styles/aboutPage.module.css'
import { Paper } from '@mui/material';





const AboutPage =()=>{
    const Item = styled(Paper)(({ theme }) => ({
			backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			...theme.typography.body2,
			padding: theme.spacing(1),
			textAlign: "center",
			color: theme.palette.text.secondary,
		}));
    return (
			<>
				<div className={styles.parallax}></div>

				<Grid className={styles.container}>
				<Grid item xs={6}>
					<Item></Item>
				</Grid>


				</Grid>
			</>
		);
}

export default AboutPage