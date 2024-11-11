import React from 'react'
import './Header.css'
import { Avatar, Chip, AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display:"flex", justifyContent:'space-between' }}>
          <Link 
            state={{ 
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
             }}
            to="/" 
            style={{ textDecoration: 'none', color: 'white'}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WhiteOut
            </Typography>
          </Link>
          {/* {isAuthenticated ? (
            <div className="cart-and-avatar">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="skibunks_logo" src={user.picture} />
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose()}>
                <Link to="/reservations" style={{ textDecoration: 'none', color: 'black'}}>My Reservations</Link>
                  </MenuItem>
                <MenuItem onClick={() => logout({ logoutParams: {returnTo: window.location.origin }})}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : ( */}
            <Chip icon={<AccountCircle />} label="Sign In" variant="outlined" onClick={() => loginWithRedirect()} />
          {/* )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}