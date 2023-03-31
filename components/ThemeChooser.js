
import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../pages/_app';

const ThemeChooser = () => {
  const [isLightMode, setIsLightMode] = useContext(Context);
  const theme = useTheme();

  const [buttonKey, setButtonKey] = useState(0);

  useEffect(() => {
    setButtonKey(Math.random());
  }, [isLightMode]);

  const handleToggle = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <Button
      variant="contained"
      sx={{ color: 'white' }}
      onClick={handleToggle}
      key={buttonKey}
    >
      {isLightMode ? 'lightMode' : 'darkMode'}
    </Button>
  );
};

export default ThemeChooser;
