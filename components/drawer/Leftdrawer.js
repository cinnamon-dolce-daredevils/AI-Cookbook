import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/leftdrawer.module.css';
import { purple } from '@mui/material/colors';
import AccountSettings from './AccountSettings';
const drawerWidth = 240;
 import { useSession } from "@supabase/auth-helpers-react";
 import { createClient } from "@supabase/supabase-js";
import IngredientDetails from '../IngredientDetails';
import ThemeChooser from '../ThemeChooser';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);





const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
const [pantryItems, setPantryItems] = useState([])


const  session  = useSession();
let userId = session?.user?.id;

async function getIngredientsList() {
	if (session && session.user) {
		userId = session.user.id;
		try {
			const { data: suggestion,  error: existingError } = await supabase
				.from("pantry")
				.select("*")
				.eq("userId", userId);

			setPantryItems(suggestion)
		} catch (error) {
			console.error(error);
			// alert(error.message);
		}
	} else {
		console.log("Session is null");
	}
}

useEffect(() => {
  if (userId) {
    getIngredientsList(userId);
  }
}, [userId, pantryItems]);



  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const purple1 = purple[600];
//style={{backgroundColor: theme.palette.secondary}}
  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <AppBar
          sx={{ backgroundColor: theme.palette.primary.main }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                backgroundColor: theme.palette.primary,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className={styles.container}>
              <Link
                href="/"
                className={styles.glitch}
                data-glitch="AI Cookbook"
              >
                AI Cookbook
              </Link>
            </div>
              <div style={{position: 'absolute', right: '100px'}}>
            <ThemeChooser />
            </div>
            <Box
              sx={{
                position: 'absolute',
                right: '50px',
              }}
            >
              <AccountSettings />
            </Box>
          </Toolbar>
        </AppBar>
        <div>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: theme.palette.secondary.main,
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <div> My Ingredients </div>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {pantryItems.map((item, index) => {
                return (
                  <>
                    <IngredientDetails item={item} index={index} />
                  </>
                );
              })}
            </List>
          </Drawer>
        </div>
        <Main open={open}>
          test
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
}

