import React from 'react'
// import toggle
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import switch
import Switch from '@mui/material/Switch';
import { createTheme } from '@mui/system';

// reminder: go to /styles to access this page. this is a prototype of
// the dark mode light mode idea

const styles = () => {
    const farmBoyOrange = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        //
        main: '#ef6c00',
      },
      secondary: {
        main: '#fbc02d',
      },
    },
  });


  const purpleDrankKingLight = createTheme({
    palette: {
      mode: 'light',
      primary: {
        // a light purple
        main: '#7e57c2',
      },
      secondary: {
        // a grassy green
        main: '#43a047',
      },
    },
  });
  const purpleDrankKingDark = createTheme({
    palette: {
      primary: {
        main: '#7e57c2',
      },
      secondary: {
        main: '#43a047',
      },
      background: {
        default: '#303030',
        paper: '#fff'
      },
    },
  })
  

  const [mode, setMode] = React.useState(false)
  // made a div to easily change colors for now
      // theme selector
  const [alignment, setAlignment] = React.useState('web');
const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
    
  return (
    <div>
          <h1> this page should style everything</h1>
          <div backgroundColor="background.default">
          <ToggleButtonGroup
            backgroundColor="primary"
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <p>Choose your theme!!!</p>
            <ToggleButton  value="purpleDrankKing">
              Purple Drank King
            </ToggleButton>
            <ToggleButton value="farmBoyOrange">Farm Boy Orange</ToggleButton>
            <p> Dark Mode Toggle</p>
            <Switch {...label} defaultChecked />
          </ToggleButtonGroup>
          </div>
          <h1>Dark Mode</h1>
          <Switch>
              
          </Switch>
    </div>
  );
}

export default styles