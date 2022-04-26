import { useAuth0 } from "@auth0/auth0-react";
// Import material icons
import { Favorite, Home, Logout } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
// Import material components
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Import assets
import logoimage from "../assets/images/logo.png";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Layout(props) {

  const navigate = useNavigate();
  const theme = useTheme();

  const uid = localStorage.getItem("uid");
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getCurrentUser();
    if (!isDBAuthenticated()) {
      navigate("/");
    }
    return () => { };
  }, []);

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (event) => {
    switch (event.currentTarget.id) {
      case "sign-out":
        // logic to remove the row
        signOut(); // contain to item.id passed by `show`
        break;
      default:
        break;
    }
  };

  function isDBAuthenticated() {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken === null || jwtToken === undefined) {
      return false;
    }
    return true;
  }

  function handleItemClick(event) {
    switch (event.currentTarget.id) {
      case "home":
        // logic to remove the row
        navigate("/user"); // contain to item.id passed by `show`
        break;
      default:
        navigate("/user/wishlist");
        break;
    }
  }

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  async function getCurrentUser() {
    const response = await fetch(`http://localhost:4000/api/users/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUser(data);
    return data;
  }

  const { logout } = useAuth0();

  function signOut() {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    logout({ returnTo: window.location.origin });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openEl}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Catty Love
          </Typography>

          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openEl ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openEl ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openEl}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem id="profile" onClick={(event) => handleMenuItemClick(event)}>
                                <Avatar /> Profile
                            </MenuItem> */}
              <MenuItem
                id="sign-out"
                onClick={(event) => handleMenuItemClick(event)}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Toolbar>
            <Avatar sx={{ mr: 2 }} src={logoimage} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Catty Love
            </Typography>
          </Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            id="home"
            onClick={(event) => handleItemClick(event)}
          >
            <ListItemIcon>
              {user && user.role === "admin" ? <PetsIcon /> : <Home />}
            </ListItemIcon>
            <ListItemText
              primary={user && user.role === "admin" ? "All Cats" : "Home"}
            />
          </ListItem>
        </List>
        <Divider />
        {user && user.role !== "admin" ? (
          <List>
            <ListItem
              button
              id="wishlist"
              onClick={(event) => handleItemClick(event)}
            >
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItem>
          </List>
        ) : null}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
