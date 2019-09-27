import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  CircularProgress,
  useMediaQuery,
  Typography,
  DialogActions
} from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";

import { postPost, clearErrors } from "../../redux/actions/dataActions";
import IconButton from "../common/IconButton";
import Button from "../common/Button";

const styles = theme => ({
  ...theme.custom(theme),
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  }
});

const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const NewPost = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) setErrors(props.UI.errors);
    if (!props.UI.errors && !props.UI.loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, [props.UI.errors, props.UI.loading]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleBodyChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.postPost({ body });
  };

  const { UI } = props;

  return (
    <>
      <IconButton onClick={handleOpen} tip="Submit new post!">
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={isSmall}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title" onClose={handleClose}>
          Write a new Post
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="body"
              type="text"
              label="Post body"
              multiline
              rows="3"
              placeholder="Whats in your mind ?"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleBodyChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

NewPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postPost, clearErrors }
)(NewPost);
