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
    // background: {
    //   default: '#a9927d',
    // },
    // text: {
    //   primary: '#f2f4f3',
    //   secondary: '#f2f4f3',
    //   disabled: '#9e9e9e',
    //   hint: '#f2f4f3',
    // },
  },
});

export const darkMode = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // total black
      main: '#000000',
    },
    secondary: {
      // dark gray
      main: '#2C3333',
    },
    background: {
      // light bluish-gray
      default: '#343a40',
    },
    text: {
      primary: '#fafafa',
      secondary: '#eeeeee',
      disabled: '#9e9e9e',
      hint: '#eeeeee',
    },
  },
});