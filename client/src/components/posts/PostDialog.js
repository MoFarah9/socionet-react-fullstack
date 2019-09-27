import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
  DialogTitle,
  useMediaQuery,
  Avatar
} from "@material-ui/core";
import {
  Close as CloseIcon,
  UnfoldMore,
  Chat as ChatIcon
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/styles";

import { getPost, clearErrors } from "../../redux/actions/dataActions";
import IconButton from "../common/IconButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = theme => ({
  ...theme.custom(theme),
  btn: {
    marginLeft: "auto"
  },
  profileImage: {
    [theme.breakpoints.up("sm")]: {
      width: 100,
      height: 100
    }
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});
const useStyles = makeStyles(styles);

const PostDialog = ({
  clearErrors,
  getPost,
  postId,
  userHandle,
  post,
  UI,
  openDialog
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  const [, setNewPath] = useState("");

  const handleOpen = () => {
    let op = window.location.pathname;
    const np = `/users/${userHandle}/post/${postId}`;
    if (op === np) op = `/users/${userHandle}`;
    window.history.pushState(null, null, np);
    setOpen(true);
    setOldPath(op);
    setNewPath(np);
    getPost(postId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const {
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      comments
    } = post,
    { loading } = UI;

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={1} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={2} sm={3}>
        <Avatar
          src={userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item xs={10} sm={9}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} likes</span>
        <IconButton tip="comments">
          <ChatIcon color={commentCount > 0 ? "primary" : "disabled"} />
        </IconButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <>
      <IconButton
        className={classes.btn}
        onClick={handleOpen}
        tip="Expand post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle id="dialog-title">
          Post by {userHandle}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PostDialog);
