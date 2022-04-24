import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Container from "@mui/material/Container";
import {AppBar,DrawerHeader,Drawer,Search,SearchIconWrapper,StyledInputBase } from './Layout.style';
import { List,ListItem,ListItemIcon,ListItemText,Divider,MenuItem } from '@mui/material';
import MenuData from './MenuData';
import DrawerMenu from './DrawerMenu';
import useAuth from '../../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from './library';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';  

export const Layout = ({ children }) => {
  const theme = useTheme();
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const setopen = Boolean(anchorEl);
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    // const { checked } = event.target
    if (currentTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  
  const handleDrawer = () => {
    setdrawerOpen(!drawerOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>

        {/* APP BAR */}  
        <AppBar position="fixed" elevation={0} open={drawerOpen}>

            <Toolbar>
              {/* ICON BUTTON */}
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                  sx={{
                  marginRight: 5,
                  ...(drawerOpen && { display: 'none' }),
                  }}
              >
                <MenuIcon />
              </IconButton>

              {/* HEADER */}
              <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, display: { mobile: 'none', tablet: 'block' } }}>
                  CTS DASHBOARD
              </Typography>

              {/* SEARCH BOX */}
              {/* <Box sx={{display:"flex", flexDirection: 'row'}}> */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <IconButton size="large" color="inherit">
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" color="inherit" onClick={() => handleThemeChange()}>
                  {/* <ColorLensIcon /> */}
                  {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <IconButton size="large" color="inherit">
                <SettingsIcon/>
              </IconButton>
              
              {/* AVATAR */}
              <Box>
                <Tooltip title="Profile Details" arrow>
                  <IconButton onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-haspopup="true"
                    aria-controls={setopen ? 'account-menu' : undefined}
                    aria-expanded={setopen ? 'true' : undefined}>
                    <Avatar {...stringAvatar(auth?.profile?.name)} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* PROFILE */}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={setopen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{display:"flex", flexDirection: 'column', width:"100%", textAlign:'center'}}>
                  <Box><Typography sx={{ fontWeight: 1000 }} variant="body">PROFILE</Typography></Box>
                    <Box sx={{display:"flex", flexDirection: 'column',m:1}}>

                      <Box sx={{display:"flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Staff No:</Typography>
                        <Typography variant="body">{auth?.profile?.username}</Typography>
                      </Box>

                      <Box sx={{display:"flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Name: </Typography>
                        <Typography variant="body">{auth?.profile?.name}</Typography>
                      </Box>
                      
                      <Box sx={{display:"flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Designation: </Typography>
                        <Typography variant="body">{auth?.profile?.designation}</Typography>
                      </Box>
                      <Box sx={{display:"flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Branch: </Typography>
                        <Typography variant="body">{auth?.profile?.dpcd}</Typography>
                      </Box>
                  </Box>
                </Box>
                <Divider />
                <MenuItem onClick={ ()=> signOut()}>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              
            </Toolbar>
        </AppBar>

        {/* MENU DRAWER */}
        <Drawer variant="permanent" open={drawerOpen}>

            <DrawerHeader>

            <Typography variant="h6" noWrap>
                EAGLE'S EYE
            </Typography>

            <IconButton onClick={handleDrawer}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuOpenIcon />}
            </IconButton>
            
            </DrawerHeader>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',height: '100%',}}>
              <List component="div" disablePadding>
                  {MenuData.map((item,index) => (
                    <DrawerMenu item={item} key={index}></DrawerMenu>
                  ))}
              </List>
              <List sx={{mt: 1 , mb:2}}>
              <ListItem 
                    button 
                    key='logout'
                    onClick={() => signOut() }>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <ListItemText primary="LOGOUT" />
                  </ListItem>
              </List>
            </Box>

        </Drawer>

        {/* MAIN CONTAINER */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container sx={{ mt:2 ,flexGrow: 1, p: 3}}>
              {children}
          </Container>
        </Box>
    </Box>
  );
}

export default Layout;