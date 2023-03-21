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
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 



export default function AccountMenu() {
  const supabase = useSupabaseClient();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsOpen = () => { setSettingsOpen(true); }; const handleSettingsClose = () => { setSettingsOpen(false); }; 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              color: 'black',
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
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/profile">
          <MenuItem sx={{ color: 'black', textDecoration: 'none' }} onClick={handleClose}>
            <Avatar className="Menutext" /> Profile
          </MenuItem>
        </Link>
        <MenuItem sx={{ color: 'black' }} onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSettingsOpen} sx={{ color: 'black' }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Dialog open={settingsOpen} onClose={handleSettingsClose}> <DialogTitle>Settings</DialogTitle> <DialogContent> <form noValidate autoComplete="off"> <TextField id="notifyTimeInDays" label="Days before expiration for notifications" type="number" InputLabelProps={{ shrink: true, }} fullWidth /> </form> </DialogContent> <DialogActions> <Button onClick={handleSettingsClose}>Cancel</Button> <Button onClick={handleSettingsClose}>Save</Button> </DialogActions>       </Dialog>
      <Link href="/">
        <MenuItem
          onClick={() => {
            handleClose();
            supabase.auth.signOut();
          }}
          sx={{ color: 'black', textDecoration: 'none' }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Link>
    </Menu>
  </>
);
}
