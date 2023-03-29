import styles from '../../styles/aboutPage.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
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
      <Box>
        <Typography m={5} p={2} align="center" variant="h2">
          Thank you for visiting our website! <br></br>
          <div style={{ height: '20px' }}></div>
          <Typography>
            After three weeks of coding day and night, our team developed the
            first version of AI Cookbook as a showcase of our skills <br></br>
            after attending FullStack Academy. We'll continue making updates
            until the near future, but we do hope you enjoy our site.<br></br>
            We've dedicated this page to pull back the curtain and show how the
            project was made!
          </Typography>
          <div style={{ height: '20px' }}></div>
        </Typography>
      </Box>
      <div className={styles.parallax}></div>

      <Box height={400}>
        <Typography align="center" variant="h2" mt={2}>
          Meet The Devs
        </Typography>

        <br></br>
        <Typography variant="p" p={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          <br></br>
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          <br></br>
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          <br></br>
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          <br></br>
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          <br></br>
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          <br></br>
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
      <div className={styles.parallax2}></div>
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
      <div className={styles.parallax3}></div>
    </>
  );
};

export default AboutPage;
