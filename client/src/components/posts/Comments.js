import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Grid, Typography, Avatar, Link as MuiLink } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

dayjs.extend(relativeTime);

const styles = theme => ({
  ...theme.custom(theme),
  avatarWrapper: {
    paddingTop: "0.9rem !important"
  },
  handle: {
    fontSize: "1rem"
  }
});

const Comments = ({ comments, classes }) => {
  if (!comments || comments.length === 0) {
    return <Typography variant="body1">No Comments</Typography>;
  }

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item container xm={12} spacing={2}>
              <Grid item className={classes.avatarWrapper}>
                <Avatar
                  aria-label="user avatar"
                  src={userImage}
                  alt="Profile image"
                />
              </Grid>
              <Grid item sm={9}>
                <MuiLink
                  component={Link}
                  to={`/users/${userHandle}`}
                  color="textPrimary"
                  className={classes.handle}
                >
                  {userHandle}
                </MuiLink>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(createdAt).from(Date.now())}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variabnt="body1">{body}</Typography>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
