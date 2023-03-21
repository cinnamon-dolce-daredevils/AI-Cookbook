import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import PersistentDrawerLeft from './drawer/Leftdrawer';

// Leftdrawer houses code for navbar
function Header () {
  return (
    <>
      <PersistentDrawerLeft />
    </>
  );
};

export default Header;
