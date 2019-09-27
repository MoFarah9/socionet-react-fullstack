import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Typography, Link as MuiLink, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon
} from "@material-ui/icons";

import { uploadImage } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";
import IconButton from "../common/IconButton";
import Button from "../common/Button";
import ProfileSkeleton from "./ProfileSkeleton";

const styles = theme => ({
  ...theme.custom(theme)
});

const useStyles = makeStyles(styles);

const Profile = ({ uploadImage, user }) => {
  const classes = useStyles();

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated
  } = user;

  if (loading) return <ProfileSkeleton />;

  if (!authenticated) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          Login to communicate with your friends
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          OR
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/signup"
          >
            Join US
          </Button>
        </div>
      </Paper>
    );
  }

  return (
    <Paper className={classes.profilePaper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />
          <IconButton
            tip="Edit profile picture"
            onClick={handleEditPicture}
            btnClassName="button"
          >
            <EditIcon color="primary" />
          </IconButton>
        </div>

        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="textPrimary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
        <EditDetails />
      </div>
    </Paper>
  );
};

Profile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { uploadImage }
)(Profile);
