import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { techInfo } from '../script/techInfo';
import style from '../styles/techCard.module.css';

const TechCard = (props) => {
  let picSize = '150px';
  
  const { src, name } = props;

  console.log(src);
  return (
    <>
      <div className={style.techCard}>
        <div className={style.techHeader}>
          <img
            src= {src}
            alt="technology logo"
            style={{ height: picSize, width: picSize }}
          />
          <h1 className={style.techName}> Tech Name </h1>
          {/* name and stuff should come in as props */}
        </div>
      </div>
    </>
  );
};

export default TechCard;
