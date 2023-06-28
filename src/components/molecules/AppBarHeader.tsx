import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Displays the AppBarHeader
 */
const AppBarHeader = () => {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const maxWidth600 = useMediaQuery('(max-width:600px)');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ position: 'unset', height: '100%' }}>
        <Toolbar>
          <IconButton
            size={maxWidth600 ? 'small' : 'large'}
            sx={{ margin: 'unset', padding: 'unset' }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="font-face-SigmarRegular"
            color="primary.contrastText"
            sx={{ flexGrow: 1 }}
          >
            <ArrowDropDownIcon sx={{ position: 'relative', left: '0.9rem', color: 'red', stroke: '#000000a8' }} />{' '}
            adrebet.com
            <ArrowDropUpIcon sx={{ position: 'relative', right: '0.4rem', color: 'green', stroke: '#000000a8' }} />
          </Typography>
          {auth && (
            <>
              <IconButton
                size={maxWidth600 ? 'small' : 'large'}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarHeader;
