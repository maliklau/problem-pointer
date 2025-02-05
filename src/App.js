import React from 'react';
import logo from './favicon.ico';
import Session from './components/Session/Session';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import './App.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const dark = '#6fee86';
const light = '#4b216e';

function App() {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  let darkMode = false

  if (theme.palette.mode === 'dark') {
    darkMode = true
  }

  function backgroundStyle(darkMode) {
    if (darkMode) {
      document.body.style.backgroundColor = '#202124'
    } else {
        document.body.style.backgroundColor = '#FAFAFA'
    }
  }

  return (
    <Router>
      <div className="App">
        <div style={{ display: 'flex' }}>
          <IconButton sx={ darkMode ? {ml: 1, color: dark} : {ml: 1, color: light} } onClick={colorMode.toggleColorMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
        {backgroundStyle(darkMode)}
        <Switch>
          <Route exact path="/" component={() => (<HomePage mode={theme.palette.mode} />)}/>
          <Route path="/session/:sessionId" component={() => (<Session mode={theme.palette.mode} />)}/>
        </Switch>
        <footer style={ darkMode ? {color: dark, fontSize: '0.8em'} : {color: light, fontSize: '0.8em'} }>
        Problem Pointer | the.lauren.malik@gmail.com | github.com/maliklau/problem-pointer
        </footer>
      </div>
    </Router>
  );
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

export default ToggleColorMode;
