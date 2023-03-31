// styles/themes.js
import { createTheme } from '@mui/material/styles';

export const lightMode = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#589981", 
      // main: "#ff971A",
		},
		secondary: {
			main: "#bea9df",
		},
		background: {
			default: "#eae8e8", // Light background color
		},
		hover: {
			main: "#ff4081",
		},

		text: {
			primary: "#262416", // Dark text color
			secondary: "#212121",
			disabled: "#9e9e9e",
			hint: "#212121",
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
		hover: {
			main: "red",
		},
		text: {
			primary: "#fafafa",
			secondary: "#eeeeee",
			disabled: "#9e9e9e",
			hint: "#eeeeee",
		},
	},
});
