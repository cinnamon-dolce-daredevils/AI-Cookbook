import style from '../../styles/aboutPage.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import SimpleGrow from '@/components/Devs';
import { DevInfo } from '@/script/devInfo';
import TechCard from '@/components/TechCard';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AboutPage = () => {
  return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					alignContent: "center",
				}}
			>
				<Typography
					m={5}
					p={2}
					align='center'
					variant='h2'
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
						width: "80%",
					}}
				>
					Thank you for visiting our website! <br></br>
					<div style={{ height: "20px" }}></div>
					<Typography
						sx={{
							width: "80%",
							flexDirection: "column",
							justifyContent: "center",
              mb:5
						}}
					>
						After three weeks of coding day and night, our team developed the
						first version of AI Cookbook as a showcase of our skills after
						attending FullStack Academy. We'll continue making updates until the
						near future, but we do hope you enjoy our site. We've dedicated this
						page to pull back the curtain and show how the project was made!
					</Typography>
					<div style={{ height: "20px" }}></div>
				</Typography>
			</Box> 
      
			<div className={style.parallax}></div>

			<Box sx={{ minHeight: 700}}>
				<Typography align='center' variant='h2' my={2}>
					Meet The Devs
				</Typography>
				<br />
        <Grid container spacing={2}  sx={{overflow:'auto', display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
				{DevInfo.map((dev) => {
					//simpleGrow is in components/Dev.js
          return (
            <Grid item xs={6} md={ 3}>
              <SimpleGrow
                sx={{ height: '130%', pb: '10px' }}
                name={dev.name}
                description={dev.description}
                linkedIn={dev.linkedIn}
                gitHub={dev.GitHub}
                avatar={dev.avatar}
              />
            </Grid>
          );
				})}
        </Grid>
			</Box>
			<div className={style.parallax2}></div>
			<div style={{ margin: "20px" }}>
				<div style={{ height: "20px" }}></div>
				<Typography align='center' variant='h2'>
					Technology Used
				</Typography>
				<div style={{ height: "30px" }}></div>
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						m: "2",
						height: "500px",
					}}
				>
					<Grid container spacing={1}>
						<Grid item xs={11} md={6}>
							<TechCard/>
						</Grid>
						<Grid item xs={11} md={6}>
							<Item>
								<Typography> Tech Name</Typography>
								<Typography>
									Tech Description <br></br>
									should <br></br>
									have multiple lines
								</Typography>
							</Item>
						</Grid>
					</Grid>
				</Box>
			</div>
			<div className={style.parallax3}></div>
		</>
	);
                  }

export default AboutPage