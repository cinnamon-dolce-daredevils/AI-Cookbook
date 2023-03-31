import style from '../../styles/aboutPage.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Slide, Switch, Typography, useScrollTrigger } from '@mui/material';
import SimpleGrow from '@/components/Devs';
import { DevInfo } from '@/script/devInfo';
import TechCard from '@/components/TechCard';
import { techInfo } from '../../script/techInfo';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AboutPage = () => {
    function SlideIn(props) {
			const { children, window, delay = 0 , direction = 'right'} = props;
			const trigger = useScrollTrigger({
				target: window && window(),
				disableHysteresis: false,
				threshold: 0,
			});

			return (
				<Slide
					direction={direction}
					in={trigger}
					style={{ transitionDelay: `${delay}ms` }}
				>
					{children}
				</Slide>
			);
		}
  return (
		<>
			<div className={style.parallax} style={{minHeight: '200px'}}></div>
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
							mb: 10,
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

			<Box sx={{ minHeight: 700 }}>
				<SlideIn delay={500}>
					<Typography align='center' variant='h2' my={2}>
						Meet The Devs
					</Typography>
				</SlideIn>
				<br />

				<Grid
					container
					spacing={2}
					sx={{
						overflow: "auto",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					{DevInfo.map((dev, index) => {
						//simpleGrow is in components/Dev.js
						return (
							<SlideIn
								key={index}
								delay={1500 + index * 500}
								mountOnEnter
								unmountOnExit
							>
								<Grid sx={{ mb: "100px" }} item xs={5} md={3}>
									<SimpleGrow
										sx={{ height: "50px" }}
										name={dev.name}
										description={dev.description}
										linkedIn={dev.linkedIn}
										gitHub={dev.GitHub}
										avatar={dev.avatar}
									/>
								</Grid>
							</SlideIn>
						);
					}).reverse()}
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
						{techInfo.map((tech, index) => {
							return (
								<>
									<Grid item xs={11} md={6} key={index}>
										<TechCard src={tech.image} title={tech.name} key={index} />
									</Grid>
								</>
							);
						})}
					</Grid>
				</Box>
			</div>
			<div className={style.parallax3}></div>
		</>
	);
                  }

export default AboutPage