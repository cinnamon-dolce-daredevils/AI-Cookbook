// styles/themes.js
import { createTheme } from '@mui/material/styles';

export const lightMode = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f58220',
    },
    secondary: {
      main: '#93c742',
    },
    background: {
      default: '#ffffff', // Light background color
    },
    text: {
      primary: '#1a1a1a', // Dark text color
      secondary: '#212121',
      disabled: '#9e9e9e',
      hint: '#212121',
    },
  },
});

export const darkMode = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#0d1116",
		},
		secondary: {
			main: "#28a37f",
		},
		background: {
			default: "#1e1e22",
		},
		text: {
			primary: "#fafafa",
			secondary: "#eeeeee",
			disabled: "#9e9e9e",
			hint: "#eeeeee",
		},
	},
});
