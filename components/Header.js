import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import PersistentDrawerLeft from './drawer/Leftdrawer';

// importing for persistent drawer



// are colors being set here?
function Header () {

  const theme = useTheme();
  return (
    <>
      <PersistentDrawerLeft />
      
    </>
  );
};

export default Header;
