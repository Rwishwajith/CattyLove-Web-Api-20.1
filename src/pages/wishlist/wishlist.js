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
}
