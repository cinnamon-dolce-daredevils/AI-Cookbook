import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TechCard = (props) => {
  return (
    <>
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
          language processing capabilities to create well-balanced meals that
          incorporated have multiple lines
        </Typography>
      </Item>
    </>
  );
}

export default TechCard