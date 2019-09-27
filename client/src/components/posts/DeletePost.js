import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../common/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";

import { deletePost } from "../../redux/actions/dataActions";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";

const DeletePost = ({ deletePost, postId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeletePost = () => {
    deletePost(postId);
    setOpen(false);
  };

  return (
    <>
      <IconButton tip="Delete Post" onClick={handleOpen}>
        <DeleteOutline color="secondary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deletePost }
)(DeletePost);
