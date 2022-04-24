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

  // Get current user details
  async function getCurrentUser() {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUser(data);
    return data;
  }

  // Get cat details
  async function getData() {
    const response = await fetch("http://localhost:4000/api/cats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCats([...data]);
  }

  return (
    <div>
      {/* Create a new cat button */}
      {(user && user.role === "admin") ? (
        <Button variant="outlined" onClick={handleClickOpenDialog} sx={{ m: 1 }}>
          Create New Cat
        </Button>
      ) : null}

      {/* Show cat feet */}
      {Array.from(cats).map((cat, index) => (
        <Feed data={cat} key={index} onLike={handleLikeEvent} onDelete={handleDelete} />
      ))}

      {/* Create cat form */}
      <Create open={openCreate} handleClose={handleCloseDialog} />

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Deleted Cat"
      />
    </div>
  );
}
export default Home;
