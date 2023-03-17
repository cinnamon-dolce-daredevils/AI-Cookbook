import * as React from 'react';
// tried to import these as objects but it errored out
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

// are colors being set here?
function Header () {

  const theme = useTheme();
  return (
    <AppBar
      position="static"
      backgroundColor='secondary'
    >
      <Toolbar backgroundColor='secondary'>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          color="theme.secondary"
          backgroundColor={theme.primary}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Pantry Popper
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
