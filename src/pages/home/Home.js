import React from "react";
import Feed from "../../components/Feed";
import Create from "../../components/Create";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";

function Home() {
  const uid = localStorage.getItem("uid");

  // State variables
  const [cats, setCats] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  // React Hook (triggers after DOM updates)
  React.useEffect(() => {
    getData();
    getCurrentUser()
    return () => { };
  }, []);


  const handleLikeEvent = (event, index) => {
    getData();
  };

  // Handle open form button
  const handleClickOpenDialog = () => {
    setOpenCreate(true);
  };

  // Handle close form button
  const handleCloseDialog = () => {
    setOpenCreate(false);
    getData();
  };

  const handleDelete = () => {
    setOpenSnack(true);
    getData();
  }

  const handleClose = () => {
    setOpenSnack(false);
  };
}