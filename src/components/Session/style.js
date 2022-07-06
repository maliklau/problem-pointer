import { makeStyles } from '@material-ui/core/styles';

const dark = '#6fee86';
const light = '#4b216e';
let mode = "";

export const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: dark,
      fontFamily: 'Kdam Thmor Pro,sans-serif',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: dark,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: dark,
    },
    '& label': {
      color: dark,
      fontFamily: 'Kdam Thmor Pro,sans-serif',
    },
    '& .MuiButtonGroup-root': {
      borderColor: dark,
      color: dark
    },
  },
  h1: {
    color: dark,
  },
  emotionIconDark: {
    color: dark
  },
  emotionIcon: {
    color: light
  },
  inputDark: {
    color: dark,
  },
  input: {
    color: light,
  },
  linkIconDark: {
    color: dark,
    display: 'inline'
  },
  linkIcon: {
    color: light,
    display: 'inline'
  },
  pointsGroup: {
    padding: '20px',
  },
  divider: {
    backgroundColor: dark,
    width: '100%',
    maxWidth: 500,
    marginTop: 25,
    marginBottom: 25,
    margin: 'auto',
  },
  users: {
    color: dark,
  },
  results: {
    color: dark,
    borderColor: dark,
    borderWidth: 1
  },
  new: {
    background: dark,
    width: '18%',
    marginBottom: 25,
  },
  join: {
    background: dark,
    width: '9%',
    marginTop: 20,
  },
  sessionButtons: {
    background: dark,
    width: '18%',
    marginBottom: 25,
    fontFamily: 'Kdam Thmor Pro,sans-serif',
  },
  colorMode: {
    color: dark,
  }
});

export default useStyles;
