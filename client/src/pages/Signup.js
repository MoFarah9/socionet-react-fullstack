import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { signupUser } from "../redux/actions/userActions";
import Button from "../components/common/Button";
import AppIcon from "../images/icon.png";

const styles = theme => ({
  ...theme.custom(theme),
  pageWrapper: {
    margin: 0,
    padding: 0
  },
  imageArea: {
    minHeight: "100vh",
    padding: "200px 50px",
    textAlign: "center",
    background: " linear-gradient(45deg, rgb(171, 105, 243), #797BE2)",
    color: "#FFF",
    "& h3": {
      fontWeight: 100
    }
  },
  formArea: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    "& form": {
      width: 400,
      padding: "200px 20px 0"
    }
  },
  image: {
    maxWidth: "50vw",
    marginBottom: "2rem"
  },
  image2: {
    marginBottom: "2rem",
    filter: "brightness(0)"
  },
  textField: {
    display: "block",
    margin: "20px 0"
  }
});
const useStyles = makeStyles(styles);

const Signup = ({ signupUser, user, UI, history }) => {
  const classes = useStyles();
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    signupUser(fields, history);
  };

  const handleChange = event => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const { loading } = UI;

  return (
    <Grid container className={classes.pageWrapper}>
      <Hidden smDown>
        <Grid className={classes.imageArea} item md={5} xl={6}>
          <img src={AppIcon} alt="monkey" className={classes.image2} />
          <Typography variant="h3">Welcome to the community</Typography>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={7} xl={6} className={classes.formArea}>
        <form noValidate onSubmit={handleSubmit}>
          <Hidden mdUp>
            <img src={AppIcon} alt="monkey" className={classes.image} />
          </Hidden>
          <Typography variant="h4" className={classes.pageTitle}>
            Signup
          </Typography>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={fields.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={fields.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={fields.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={fields.handle}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <p>
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </p>
        </form>
      </Grid>
    </Grid>
  );
};

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);
