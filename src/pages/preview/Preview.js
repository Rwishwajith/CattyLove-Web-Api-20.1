import React, { useEffect } from "react";
// Import material components
import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// React Hook (triggers after DOM updates)
useEffect(() => {
  getCatDetails().then((data) => {
    getCatComments(data._id);
  });
  return () => { };
}, []);

// Handle delete comment button click
const handleDeleteComment = (commentId) => {
  deleteComment(commentId).then((data) => {
    getCatComments(data._id);
  });
};

// Handle input text (comment)
const handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
};
// Handle comments button
const handleMouseDownText = (event) => {
  event.preventDefault();
};

// Handle comments button click
const handleClickSend = (event) => {
  setValues({
    ...values,
    comments: values.comment,
  });
  setCatComment().then((data) => {
    getCatComments(data._id);
  });
};

// Handle add to wishlist button click
const handleAddToWishlist = (event) => {
  addToWishlist().then((data) => {
    if (data) setOpenSnack(true);
  });
};

  // Get all cat details (all details in json)
  async function getCatDetails() {
    const response = await fetch(`http://localhost:4000/api/cats/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCat(data);
    return data;
  }

  // Add a cat to wishlist
  async function addToWishlist() {
    const uid = localStorage.getItem("uid");
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: cat._id,
        }),
      }
    );
    const data = await response.json();
      return data;
    }

