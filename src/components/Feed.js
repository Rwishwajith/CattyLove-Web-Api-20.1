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

//name, gender, description, no of likes the cat has, and a profile picture.

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  height: 24,
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

let userOptions = ["Add to Wishlist", "Share"];



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
          _id: props.data._id,
        }),
      }
    );

    const data = await response.json();
    return data;
  }

  return (
    <div>
      <Card
        sx={{ maxWidth: "100vw", m: 1, boxShadow: 2, borderRadius: "0.5em" }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {props.data.photoURL ? (
                <img src={props.data.photoURL} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'contain' }} alt="" />
              ) : (
                props.data.displayName.charAt(0)
              )}
            </Avatar>
          }
          action={
            <IconButton onClick={handleClickListItem}>
              <MoreVertIcon />
            </IconButton>
          }
          title={props.data.displayName}
          subheader={format(props.data.createdAt)}
        />
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {user && user.role === 'admin' ? (
            adminOptions.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index, option)}
              >
                {option}
              </MenuItem>
            ))
          ) :
            userOptions.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index, option)}
              >
                {option}
              </MenuItem>
            ))
          }
        </Menu>
        <CardContent>
          <Typography
            variant="body2"
            gutterBottom
            color="text.secondary"
            sx={{
              wordWrap: "break-word",
              m: 1,
            }}
          >
            Description:
            <br />
            {props.data.description ? props.data.description : "N/A"}
          </Typography>
          <Stack spacing={1}>
            {" "}
            <Stack direction="row" spacing={1}>
              {props.data && props.data.features ? (
                Array.from(props.data.features).map((data, index) => (
                  <Chip
                    label={data}
                    variant="outlined"
                    color="info"
                    key={index}
                  />
                ))
              ) : (
                <Chip label="No Features" />
              )}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleLikeButtonClick}
            sx={{ color: liked ? blue[700] : blue[700] }}
          >
            {/* <Button onClick={handleLikeButtonClick} sx={{ color: blue[700] }}> */}
            <ThumbUp sx={{ mr: 1 }} />
            {props.data.likedBy.length}{" "}
            {props.data.likedBy.length === 1 ? "like" : "likes"}
          </Button>

          <Button onClick={handleExpandClick}>
            <Comment sx={{ mr: 1 }} />
            Comments
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon sx={{ color: blue[700] }} />
            </ExpandMore>
          </Button>

          <Button sx={{ ml: "auto" }} onClick={handleViewClick}>
            <VisibilityIcon sx={{ mr: 1 }} />
            View
          </Button>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {comments.length > 0 ? (
              <List>
                {Array.from(comments).map((data, index) => (
                  <div key={index}>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText primary={data.comment}></ListItemText>
                          <ListItemSecondaryAction
                            sx={{
                              display: uid === data.uid ? "block" : "none",
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                handleDeleteComment(data.commentId)
                              }
                            >
                              <Delete sx={{ color: red[500] }} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            secondary={format(data.createdAt)}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            ) : (
              <Typography paragraph sx={{ m: 1 }}>
                No comments yet.
              </Typography>
            )}

            <Grid
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              sx={{ mt: 3 }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="send-comment">Comment</InputLabel>
                <OutlinedInput
                  id="send-comment"
                  onChange={handleChange("comment")}
                  value={values.comment}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onMouseDown={handleMouseDownText}
                        onClick={(event) => handleClickSend(event)}
                        edge="end"
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Comment"
                />
              </FormControl>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Added to Wishlist"
        action={snackbarAction}
      />
    </div>
  );
}