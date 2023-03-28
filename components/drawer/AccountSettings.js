import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import GradeIcon from '@mui/icons-material/Grade';
import { Typography } from '@mui/material';
import ThemeChooser from '../ThemeChooser';
import { useTheme } from '@emotion/react';

export default function AccountMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const personalityChangeListeners = new Set();
  const open = Boolean(anchorEl);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsOpen = () => { setSettingsOpen(true); };
  const handleSettingsClose = () => { setSettingsOpen(false); };
  const [selectedPersonality, setSelectedPersonality] = React.useState('normalAI');

  const storePersonalityInLocalStorage = (selectedPersonality) => {
    localStorage.setItem('selectedPersonality', selectedPersonality);
  };

  React.useEffect(() => {
    const storedPersonality = localStorage.getItem('selectedPersonality');
    if (storedPersonality) {
      setSelectedPersonality(storedPersonality);
    }
  }, []);

  const handleChangePersonality = (event) => {
    const newPersonality = event.target.value;
    setSelectedPersonality(newPersonality);
    storePersonalityInLocalStorage(newPersonality);
    window.location.reload();
  };
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          paddingRight: '0',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: theme.palette.secondary.main,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              color: 'black',
              backgroundColor: 'white',
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              backgroundColor: theme.palette.secondary.main,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link style={{ textDecoration: 'none' }} href="/profile">
          <MenuItem sx={{ color: 'white' }} onClick={handleClose}>
            <Avatar className="Menutext" /> Profile
          </MenuItem>
        </Link>
        <MenuItem
          sx={{ color: theme.palette.text.primary, mr: 'auto' }}
          onClick={handleClose}
        >
          <Link
            style={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
            href={'/favorites'}
          >
            <GradeIcon sx={{ color: theme.palette.text.primary, mr: 1 }} />
            Favorites
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleSettingsOpen}
          sx={{ color: theme.palette.text.primary }}
        >
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: 'white' }} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Dialog open={settingsOpen} onClose={handleSettingsClose}>
          <DialogTitle
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            Settings
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: theme.palette.secondary.main,
              padding: (theme) => theme.spacing(3),
            }}
          >
            <Typography
              sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}
            >
              Choose a Color Theme
            </Typography>
            
              <ThemeChooser />

            <form noValidate autoComplete="off">
              <Typography
                sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}
              >
                Choose a Famous Person to Help You Cook
              </Typography>
              <RadioGroup
                aria-label="personality"
                name="personality"
                value={selectedPersonality}
                onChange={handleChangePersonality}
                sx={{
                  marginTop: (theme) => theme.spacing(2),
                  marginBottom: (theme) => theme.spacing(2),
                  color: 'black',
                }}
              >
                <FormControlLabel
                  value="normalAI"
                  control={<Radio />}
                  label="Normal AI"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="snoopDogg"
                  control={<Radio />}
                  label="Snoop Dogg"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="spongebob"
                  control={<Radio />}

                  label="Spongebob Squarepants"
                  sx={{ color: 'white' }}

                />
                <FormControlLabel
                  value="gordonRamsay"
                  control={<Radio />}
                  label="Gordon Ramsay"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="michaelJackson"
                  control={<Radio />}
                  label="Michael Jackson"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="arianaGrande"
                  control={<Radio />}

                  label="Guy Fieri"
                  sx={{ color: 'white' }}
                  label="Ariana Grande"
                  sx={{ color: 'white' }}

                />
              </RadioGroup>
            </form>
          </DialogContent>
        </Dialog>
      </Menu>
    </>
  );
}