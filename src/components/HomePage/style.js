import { makeStyles } from '@material-ui/core/styles';

const dark = '#6fee86';
const light = '#4b216e';

export const useStyles = makeStyles({
  h1Dark: {
    color: dark,
  },
  h1: {
    color: light,
  },
  input: {
    color: dark,
  },
  linkIcon: {
    color: dark,
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
  linkButton: {
    display: 0,
  },
  join: {
    background: dark,
    width: '9%',
    marginTop: 20,
  },
  sessionButtons: {
    background: light,
    width: '18%',
    marginBottom: 25,
    fontFamily: 'Kdam Thmor Pro,sans-serif',
    color: 'white',
  },
  sessionButtonsDark: {
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
