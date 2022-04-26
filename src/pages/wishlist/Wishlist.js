import React from "react";
// Import material components
import {
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Snackbar,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
// Import material colors
import { red } from "@mui/material/colors";
//  Import material icons
import { Delete } from "@mui/icons-material";

export default function Wishlist() {
  // Get userid
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  // State variables
  const [openSnack, setOpenSnack] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

  // React Hook (triggers after DOM updates)
  React.useEffect(() => {
    getWishlistedCats();
    return () => {};
  }, []);

  // Handle delete button click
  const handleDelete = (id) => {
    console.log(id);
    removeFromWishlist(id).then((data) => {
      if (data) {
        getWishlistedCats();
        setOpenSnack(true);
      }
    });
  };

  // On item click navigate to preview page
  const handleItemClick = (id) => {
    navigate(`/cat/${id}/preview`);
  };

  // Get all wishlisted cats (GET)
  async function getWishlistedCats() {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setWishlist([...data]); // Set json data

    return data;
  }

  // Remove a cat from wishlist
  async function removeFromWishlist(id) {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  }

  return (
    <div>
      <h1>Wishlist</h1>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {Array.from(wishlist).map((cat, index) => (
          <div key={index}>
            <ListItem
              alignItems="flex-start"
              button
              onClick={(event) => handleItemClick(cat._id)}
            >
              {/* START -- Display cat profile image -- */}
              <ListItemAvatar>
                <Avatar alt="" src={cat.photoURL} />
              </ListItemAvatar>
              {/* END -- Display cat profile image -- */}
              {/* START -- Display cat details -- */}
              <ListItemText
                primary={cat.displayName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {cat.address}
                    </Typography>
                    {`  -   ${cat.city ? cat.city : "N/A"}`}
                  </React.Fragment>
                }
              />
              {/* END -- Display cat details -- */}
              {/* START -- Delete button --*/}
              <ListItemSecondaryAction>
                <IconButton
                  onClick={(event) => {
                    handleDelete(cat._id);
                  }}
                >
                  <Delete sx={{ color: red[500] }} />
                </IconButton>
              </ListItemSecondaryAction>
              {/* END -- Delete button -- */}
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      {/* Display message */}
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message="Deleted cat from wishlist"
      />
    </div>
  );
}
