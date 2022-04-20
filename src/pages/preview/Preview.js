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
