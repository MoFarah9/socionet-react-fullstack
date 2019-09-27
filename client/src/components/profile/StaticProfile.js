import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Link as MuiLink, Paper, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday
} from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  ...theme.custom(theme)
});

const StaticProfile = ({
  classes,
  profile: { handle, createdAt, imageUrl, bio, website, location }
}) => (
  <Paper className={classes.profilePaper}>
    <div className={classes.profile}>
      <div className="image-wrapper">
        <img src={imageUrl} alt="profile" className="profile-image" />
      </div>
      <hr />
      <div className="profile-details">
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
        >
          @{handle}
        </MuiLink>
        <hr />
        {bio && <Typography variant="body2">{bio}</Typography>}
        <hr />
        {location && (
          <Fragment>
            <LocationOn color="primary" /> <span>{location}</span>
            <hr />
          </Fragment>
        )}
        {website && (
          <Fragment>
            <LinkIcon color="primary" />
            <a href={website} target="_blank" rel="noopener noreferrer">
              {" "}
              {website}
            </a>
            <hr />
          </Fragment>
        )}
        <CalendarToday color="primary" />{" "}
        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
      </div>
    </div>
  </Paper>
);

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
