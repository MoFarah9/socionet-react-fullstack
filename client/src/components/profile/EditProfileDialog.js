import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({ ...theme.custom(theme) }));

function EditProfileDialog({
  open,
  credentials,
  editUserDetails,
  handleClose
}) {
  const classes = useStyles();
  const [details, setDetails] = useState({
    bio: "",
    website: "",
    location: ""
  });

  useEffect(() => {
    setDetails({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }, [credentials]);

  const handleChange = event => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    editUserDetails(details);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit your details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            name="bio"
            tpye="text"
            label="Bio"
            multiline
            rows="3"
            placeholder="A short bio about yourself"
            className={classes.textField}
            value={details.bio}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="website"
            tpye="text"
            label="Website"
            placeholder="Your personal/professinal website"
            className={classes.textField}
            value={details.website}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="location"
            tpye="text"
            label="Location"
            placeholder="Where you live"
            className={classes.textField}
            value={details.location}
            onChange={handleChange}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EditProfileDialog;
