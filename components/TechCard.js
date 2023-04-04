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

  const { src, name, description } = props;

  return (
    <>
      <div className={style.techCard}>
        <div className={style.techHeader}>
          <img
            src={src}
            alt="technology logo"
            style={{ height: picSize, width: picSize,  padding: '10px' }}
          />
          <h1 className={style.techName}> {name} </h1>
        </div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default TechCard;
