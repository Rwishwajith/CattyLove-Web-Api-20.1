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
