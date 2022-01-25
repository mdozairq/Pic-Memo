import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Avatar } from '@material-ui/core';
import { useStyles } from './styles';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function NavBar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/auth');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    //
    if(token){
      const decodedToken = decode(token);

      if(decodedToken.exp *1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))

  }, [location]);

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to="/" variant="h5" className={classes.title}>
            Pic-Memo
          </Typography>
          {user?.result ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={user.result.name} src={user.result.imageUrl} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{user.result.name}</MenuItem>
                <MenuItem onClick={handleClose}>{user.result.email}</MenuItem>
              </Menu>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
        </Toolbar>

      </AppBar>
    </div>
  );
}
