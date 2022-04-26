import { Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import React from "react";
import Create from "../../components/Create";
import Feed from "../../components/Feed";

function Home() {
  const uid = localStorage.getItem("uid");

  // State variables
  const [cats, setCats] = React.useState([]);
  const [fact, setFact] = React.useState('');
  const [user, setUser] = React.useState({});
  const [openFact, setOpenFact] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  // React Hook (triggers after DOM updates)
  React.useEffect(() => {
    getData();
    getCurrentUser()
    getCatFact().then(res => {
      setOpenFact(true);
    });
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
    setOpenFact(false);
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



  //cat fact third party API
  async function getCatFact() {
    const response = await fetch("https://catfact.ninja/fact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFact(data.fact);
    return data.fact;
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

      <Snackbar open={openFact} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Did you know? {fact}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Home;