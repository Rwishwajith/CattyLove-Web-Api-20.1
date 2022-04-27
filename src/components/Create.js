import CloseIcon from "@mui/icons-material/Close";
import { Alert, Grid, Snackbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import FeatureInput from "./FeatureInput";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
  catName: "",
  catDescription: "",
  gender: "Male" | "Female",
  catImage: "",
  age: "",
  address: "",
  features: [],
  longitude: "",
  latitude: "",
  city: "",
  contact: ""
};

export default function Create(props) {
  const uid = localStorage.getItem("uid");

  const [feature, setFeature] = React.useState([]);
  const [values, setValues] = useState(initialValues);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [error, setError] = React.useState('');
  const [openError, setErrorSnack] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    createCatData().then((data) => {
      if (data) setOpenSnack(true);
    });
  };

  const handleClose = () => {
    setOpenSnack(false);
    setErrorSnack(false);
  };

  async function createCatData() {
    const response = await fetch("http://localhost:4000/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: values.catName,
        gender: values.gender,
        description: values.catDescription,
        photoURL: values.catImage,
        address: values.address,
        lng: values.longitude,
        lat: values.latitude,
        city: values.city,
        age: values.age,
        contact: values.contact,
        features: feature,
        owner: uid,
      }),
    });

    const jsonData = await response.json();
    if (jsonData.error) {
      setError(jsonData.error);
      setErrorSnack(true);
      return false;
    }
    return jsonData;
  }

  const handleSelectedTags = (items) => {
    setFeature(items);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Cat
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container sx={{ p: 2 }}>
          <Grid
            item
            xs={12}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <p>
              Upload Image:{" "}
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setValues({ ...values, catImage: base64 })
                }
              />
            </p>

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="catName"
              label="Cat Name"
              value={values.catName}
              onChange={(event) =>
                setValues({ ...values, catName: event.target.value })
              }
              autoFocus
            />

            <FeatureInput
              margin="normal"
              selectedTags={handleSelectedTags}
              fullWidth
              variant="outlined"
              id="features"
              name="Features"
              placeholder="Type feature"
              label="Features"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                onChange={(event) =>
                  setValues({ ...values, gender: event.target.value })
                }
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="age"
              label="Cat Age"
              value={values.age}
              onChange={(event) =>
                setValues({ ...values, age: event.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="Address"
              label="Cat Address"
              value={values.address}
              onChange={(event) =>
                setValues({ ...values, address: event.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="City"
              label="City"
              value={values.city}
              onChange={(event) =>
                setValues({ ...values, city: event.target.value })
              }
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: -90, max: 90 } }}
                  name="Latitude"
                  label="Latitude"
                  value={values.latitude}
                  onChange={(event) =>
                    setValues({ ...values, latitude: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: -180, max: 180 } }}
                  name="Longitude"
                  label="Longitude"
                  value={values.longitude}
                  onChange={(event) =>
                    setValues({ ...values, longitude: event.target.value })
                  }
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="catDescription"
              label="Cat Description"
              value={values.catDescription}
              onChange={(event) =>
                setValues({ ...values, catDescription: event.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="contact"
              label="Contact Number"
              value={values.contact}
              onChange={(event) =>
                setValues({ ...values, contact: event.target.value })
              }
            />

            <Button
              style={{ borderRadius: "2em", marginTop: "1em" }}
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cat created successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}