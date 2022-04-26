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
import GoogleMapReact from "google-map-react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
// Import assets
import logoimage from "../../assets/images/logo.png";
// Import material colors
import { blue, red } from "@mui/material/colors";
// Import material icons
import { Comment, Delete, Favorite, Send, ThumbUp } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";

// Google maps marker
const Marker = ({ color }) => <div>{<NavigationIcon color={color} />}</div>;

export default function Preview() {
  // Default latitute and longitute coordinates
  const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
  const zoom = 5;
  // Get userid
  const uid = localStorage.getItem("uid");

  let { id } = useParams();

  // State variables
  const [values, setValues] = React.useState({
    comment: "",
  });
  const [comments, setComments] = React.useState([]);
  const [cat, setCat] = React.useState({});
  const [openSnack, setOpenSnack] = React.useState(false);
  
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

