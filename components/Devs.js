import React from "react";
import styles from "../styles/aboutPage.module.css";
import avatar from "../public/images/ryanpic.png";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Link, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useMute } from "@/components/MuteContext";


export default function SimpleGrow(props) {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);
  const { name, description, linkedIn, gitHub, avatar, customIcon } = props;
  const { isMuted } = useMute();

  function playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
  }

  const handleClick = () => {
    if (!isMuted) {
      if (checked) {
        playAudio("/audio/Short.m4a");
      } else {
        playAudio("/audio/New Recording.m4a");
      }
    }
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: "auto" }}>
      {/* ... other components */}
      <Box
        sx={
          checked
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        {/* ... other components */}
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Box
            variant="body1"
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* ... other icons */}
            {customIcon && (
              <Link href="https://codencodes.com">
                {React.cloneElement(customIcon, {
                  style: {
                    fontSize: "2em",
                    color:
                      theme.palette.mode === "dark" ? "white" : "initial",
                  },
                })}
              </Link>
            )}
          </Box>
        </Grow>
      </Box>
    </Box>
  );
}