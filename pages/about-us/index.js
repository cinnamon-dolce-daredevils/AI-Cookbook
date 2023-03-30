import style from '../../styles/aboutPage.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import SimpleGrow from '@/components/Devs';
import { DevInfo } from '@/script/devInfo';
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Typography
          m={5}
          p={2}
          align="center"
          variant="h2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: '80%',
          }}
        >
          Thank you for visiting our website! <br></br>
          <div style={{ height: '20px' }}></div>
          <Typography
            sx={{
              width: '80%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            After three weeks of coding day and night, our team developed the
            first version of AI Cookbook as a showcase of our skills after
            attending FullStack Academy. We'll continue making updates until the
            near future, but we do hope you enjoy our site. We've dedicated this
            page to pull back the curtain and show how the project was made!
          </Typography>
          <div style={{ height: '20px' }}></div>
        </Typography>
      </Box>
      <div className={style.parallax}></div>

			<Box height={1000}>
				<Typography align='center' variant='h2' mt={2}>
					Meet The Devs
				</Typography>


				<br/>
        {DevInfo.map((dev, idx)=>{
          return <SimpleGrow key={idx} name={dev.name} description={dev.description} linkedIn={dev.linkedIn} gitHub={dev.GitHub}/>
        })}
      </Box>
      <div className={style.parallax2}></div>
      <div style={{ margin: '20px' }}>
        <div style={{ height: '20px' }}></div>
        <Typography align="center" variant="h2">
          Technology Used
        </Typography>
        <div style={{ height: '30px' }}></div>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            m: '2',
            height: '500px',
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={11} md={6}>
              <Item>
                <div style={{ padding: '40px' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      backgroundColor: 'blue',
                      height: '100px',
                    }}
                  >
                    Image will be here
                  </Box>
                  <Typography mt={5}> OpenAI</Typography>
                </div>
                <div style={{ height: '50px' }}></div>
                <Typography>
                  OpenAI's API was utilized to generate personalized recipes
                  <br />
                  based on user-specified ingredients, leveraging its natural
                  <br />
                  language processing capabilities to create well-balanced meals
                  that incorporated have multiple lines
                </Typography>
              </Item>
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
};

export default AboutPage;
