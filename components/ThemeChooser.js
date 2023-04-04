
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../pages/_app';

const ThemeChooser = () => {
  const [isLightMode, setIsLightMode] = useContext(Context);
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
      {isLightMode ? 'darkMode' : 'lightMode'}
    </Button>
  );
};

export default ThemeChooser;
