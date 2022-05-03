import * as React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../public/bookbee-logo.png';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 150,
    marginRight: '10px'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px'
  }
}));

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = (props) => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(props.user);
  let buttons;
  if (props.user.loading === true) {
    buttons = (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="profile" onClick={handleCloseUserMenu}>
            <Link to="/profile" className={classes.link}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem key="logout" onClick={() => localStorage.clear()}>
            <Link to="/" className={classes.link}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    );
  } else {
    buttons = (
      <Box sx={{ flexGrow: 0 }}>
        <MenuItem key="login" onClick={handleCloseNavMenu}>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </MenuItem>
      </Box>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem key="home" onClick={handleCloseNavMenu}>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem key="home" onClick={handleCloseNavMenu}>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </MenuItem>
          </Box>

          {buttons}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
