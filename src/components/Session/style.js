import { makeStyles } from '@material-ui/core/styles';

const primary = '#6fee86';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primary,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: primary,
    },
    '& label': {
      color: primary,
    },
  },
  h1: {
    color: primary,
  },
  input: {
    color: primary,
  },
  linkIcon: {
    color: primary,
    display: 'inline'
  },
  points: {
    color: primary,
    borderColor: primary,
  },
  pointsGroup: {
    padding: '20px',
  },
  divider: {
    backgroundColor: primary,
    width: '100%',
    maxWidth: 500,
    marginTop: 25,
    marginBottom: 25,
    margin: 'auto',
  },
  users: {
    color: primary,
  },
  results: {
    color: primary,
    borderColor: primary,
    borderWidth: 1
  },
  new: {
    background: primary,
    width: '18%',
    marginBottom: 25,
  },
  linkButton: {
    display: 0,
  },
  join: {
    background: primary,
    width: '9%',
    marginTop: 20,
  },
});

export function getStyles() {
  return useStyles;
}

export default useStyles;
