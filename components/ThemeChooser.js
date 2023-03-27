import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import React, { useState, createContext, useContext } from 'react';
import { Context } from "../pages/_app"
// trying to carry over the word light or dark to another component
const ThemeChooser = () => {
  let [mode, setMode] = useState('lightMode');
  const theme = useTheme();
  let [isLightMode, setIsLightMode] =useContext(Context);
  const handleToggle = () => {
    setIsLightMode(!isLightMode);
    if (isLightMode == true) {
      setMode('darkMode');
      console.log(mode);
    } else {
      setMode('lightMode');
      console.log(mode);
    }
  };
  return (

      <Button
        variant="contained"
        sx={{ color: theme.palette.common.white }}
        onClick={handleToggle}
      >
        {mode}
      </Button>

  );
};
export default ThemeChooser;
