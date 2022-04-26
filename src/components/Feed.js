import { Delete, Send } from "@mui/icons-material";
import Comment from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUp from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { blue, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";





  //Handle Like Button Click
  const handleLikeButtonClick = () => {
    if (!isAuthenticated()) {
      alert("Please login to like this cat");
      return;
    }

    setLike(!liked);
    likeCat().then(() => {
      props.onLike(true);
    });
  };

  const handleViewClick = () => {
    navigate(`/cat/${props.data._id}/preview`);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      getCatComments();
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenSnack(false);
  };

  function isAuthenticated() {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken === null || jwtToken === undefined) {
      return false;
    }
    return true;
  }

  async function likeCat() {
    const response = await fetch(
      `http://localhost:4000/api/cats/${props.data._id}/like/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: localStorage.getItem("uid"),
        }),
      }
    );
    const data = await response.json();
    return data;
  }
