import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { Context } from "../pages/_app"
// trying to carry over the word light or dark to another component
const ThemeChooser = () => {
  let [mode, setMode] = useState('darkMode');
  const theme = useTheme();
  // isLightMode controls the theme and can switch from light to dark
  let [isLightMode, setIsLightMode] = useContext(Context);
  const handleToggle = () => {
    setIsLightMode(!isLightMode);
    if (isLightMode == true) {
      setMode('darkMode');
    } else {
      setMode('lightMode');
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
