import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Button from "../common/Button";
import { submitComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
  ...theme.custom(theme),
  button: {
    display: "block",
    marginLeft: "auto",
    marginTop: 12
  }
}));

const CommentForm = ({ submitComment, UI, postId, authenticated }) => {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
    }
  }, []);

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    submitComment(postId, { body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item xs={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(CommentForm);
