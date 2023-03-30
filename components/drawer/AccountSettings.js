import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GradeIcon from "@mui/icons-material/Grade";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ThemeChooser from "../ThemeChooser";
import { useTheme } from "@emotion/react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { useMute } from "../MuteContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSession } from '@supabase/auth-helpers-react';
export default function AccountMenu() {
  const theme = useTheme();
  const { isMuted, setIsMuted } = useMute();
  const session = useSession();
  const personalityChangeListeners = new Set();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };
  const [selectedPersonality, setSelectedPersonality] = React.useState("AI");
  const [tempSelectedPersonality, setTempSelectedPersonality] =
  React.useState(localStorage.getItem("selectedPersonality") || "AI");

  const { isMuted, setIsMuted } = useMute();

  const storePersonalityInLocalStorage = (selectedPersonality) => {
    localStorage.setItem("selectedPersonality", selectedPersonality);
  };

  const handleMuteChange = (event) => {
    setIsMuted(event.target.checked);
    localStorage.setItem("isMuted", event.target.checked);
  };

  React.useEffect(() => {
    const storedMuteStatus = localStorage.getItem("isMuted");
    if (storedMuteStatus) {
      setIsMuted(storedMuteStatus === "true");
    }
  }, []);

  React.useEffect(() => {
    const storedPersonality = localStorage.getItem("selectedPersonality");
    if (storedPersonality) {
      setSelectedPersonality(storedPersonality);
    }
  }, []);

  const handleChangePersonality = (event) => {
    setTempSelectedPersonality(event.target.value);
  };

  const handleApplyChanges = () => {
    setSelectedPersonality(tempSelectedPersonality);
    storePersonalityInLocalStorage(tempSelectedPersonality);
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
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          paddingRight: "0",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ position: "relative", left: "35px" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
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
            overflow: "hidden",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            backgroundColor: theme.palette.secondary.main,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              color: "black",
              backgroundColor: "white",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              backgroundColor: theme.palette.secondary.main,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link style={{ textDecoration: "none" }} href="/profile">
          <MenuItem sx={{ color: "white", mr: "auto" }} onClick={handleClose}>
            <Avatar className="Menutext" />{" "}
            <div style={{ paddingLeft: "10px" }}>Profile </div>
          </MenuItem>
        </Link>
        {session ?
        <MenuItem
          sx={{ color: theme.palette.text.primary }}
          onClick={handleClose}
        >
          <Link
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
          href={'/favorites'}
          >
            <GradeIcon sx={{ color: "white", mr: 1 }} />
            <span style={{ position: "relative", bottom: "5px" }}>
              Favorites
            </span>
          </Link>
        </MenuItem>
         : null }
        <MenuItem
          sx={{ color: theme.palette.text.primary }}
          onClick={handleClose}
        >
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            href={"/about-us"}
          >
            <InfoOutlinedIcon sx={{ color: "white", mr: 1 }} />
            <span style={{ position: "relative", bottom: "5px" }}>
              {" "}
              About Us
            </span>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSettingsOpen} sx={{ color: "white" }}>
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: "white" }} />
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
              sx={{ color: theme.palette.common.white, fontWeight: "bold" }}
            >
              Choose a Color Theme
            </Typography>

            <ThemeChooser />

            <form noValidate autoComplete="off">
              <Typography
                sx={{ color: theme.palette.common.white, fontWeight: "bold" }}
              >
                Choose a Famous Person to Help You Cook
              </Typography>
              <RadioGroup
                aria-label="personality"
                name="personality"
                value={tempSelectedPersonality}
                onChange={handleChangePersonality}
                sx={{
                  marginTop: (theme) => theme.spacing(2),
                  marginBottom: (theme) => theme.spacing(2),
                  color: "black",
                }}
              >
                <FormControlLabel
                  value="AI"
                  control={<Radio />}
                  label="AI"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value="Snoop Dogg"
                  control={<Radio />}
                  label="Snoop Dogg"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value="Spongebob"
                  control={<Radio />}
                  label="Spongebob"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value="Gordon Ramsay"
                  control={<Radio />}
                  label="Gordon Ramsay"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value="Ariana Grande"
                  control={<Radio />}
                  label="Ariana Grande"
                  sx={{ color: "white" }}
                />
              </RadioGroup>
              <Button
            variant="contained"
            onClick={handleApplyChanges}
            sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
          >
            Apply Changes
          </Button>
            </form>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={isMuted} onChange={handleMuteChange} />
                  }
                  label="Mute Sounds"
                  sx={{ color: "white" }}
                />
              </FormGroup>
            </FormControl>
          </DialogContent>
        </Dialog>
      </Menu>
    </>
  );
}
