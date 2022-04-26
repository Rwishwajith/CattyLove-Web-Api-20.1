import Box from "@mui/material/Box";
// Import material components
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// Import material colors
import { blue, grey, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import assets
import loginimage from "../../assets/images/login_image.png";
import logoimage from "../../assets/images/logo.png";
import LoginButton from "../../components/GoogleButton";
const initialValues = {
  email: "",
  password: "",
};

function Auth() {
  // State variables
  const [values, setValues] = useState(initialValues);
  // Error Message state variable
  const [eMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  // React Hook (triggers after DOM updates)
  useEffect(() => {

    return () => { };
  }, [eMessage]);

  // Handle submit login info (POST login details)
  async function handleSubmit(event) {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const repsonse = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });

    const jsonData = await repsonse.json();

    //If credentials are valid then navigate to home
    if (jsonData.uid) {
      localStorage.setItem("uid", jsonData.uid);
      localStorage.setItem("token", jsonData.token);
      navigate("/user");
    } else {
      // Else set error message
      setErrorMessage(jsonData.error);
    }

  }

  // Show error message
  function renderElement() {
    if (eMessage !== undefined)
      return (
        <Box
          fullWidth
          sx={{
            backgroundColor: red[500],
            height: "2em",
            borderRadius: "2em",
            mt: "1em",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "white" }}>
            {eMessage}
          </Typography>
        </Box>
      );
    return null;
  }

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: blue[700], minHeight: "100vh" }}
    >
      <Card
        sx={{ borderRadius: "1em" }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <CardHeader
              // Cat logo
              avatar={<img src={logoimage} alt="" />}
              // Catty Love
              title={
                <Typography variant="h5" sx={{ color: blue[700] }}>
                  Catty Love
                </Typography>
              }
              // Get Started with Catty Love
              subheader={
                <Typography variant="subtitle2" sx={{ color: grey[500] }}>
                  Get Started with Catty Love
                </Typography>
              }
            />

            <CardContent>
              {/* Email Textfield */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                autoComplete="email"
                value={values.email}
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
                autoFocus
              />
              {/* Password Textfield */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
                autoComplete="current-password"
              />
              {/* Remember Me checkbox */}

              {/* Sign In button */}
              <Button
                style={{ borderRadius: "2em", marginTop: "1em" }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>

              <LoginButton />
              {/* Initially hide this, onSubmit show error message */}
              {renderElement()}
            </CardContent>

            <CardActions sx={{ m: 1 }}>
              <Typography variant="caption" sx={{ cursor: "pointer" }} onClick={() => { navigate('/sign-up') }}>Create Account</Typography>
            </CardActions>
          </Grid>

          {/* Display Login Background image */}
          <Grid
            item
            xs={6}
            style={{ backgroundColor: blue[100] }}
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <img src={loginimage} style={{ margin: 0 }} alt="" />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Auth;