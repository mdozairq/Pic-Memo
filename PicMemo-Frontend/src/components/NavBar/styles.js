import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#fff',
    fontFamily: 'monteserat sans',
    fontWeight:'700',
  },
  AppBar:{
    backgroundColor: '#79B4B7',
  }
}));
