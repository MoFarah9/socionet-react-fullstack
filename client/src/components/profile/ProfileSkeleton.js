import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Skeleton } from "@material-ui/lab";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday
} from "@material-ui/icons";
import clsx from "clsx";

const styles = theme => ({
  ...theme.custom(theme),
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
const useStyles = makeStyles(styles);

const ProfileSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper className={clsx(classes.paper, classes.root)}>
      <Skeleton variant="circle" width={200} height={200} />
      <Skeleton width={50} />
      <Skeleton width={200} height={10} />
      <Skeleton width={100} height={10} />
      <div className={classes.iconText}>
        <LocationOn color="primary" />
        <Skeleton component="span" width={50} />
      </div>
      <div className={classes.iconText}>
        <LinkIcon color="primary" />
        <Skeleton width={100} />
      </div>
      <div className={classes.iconText}>
        <CalendarToday color="primary" />
        <Skeleton width={100} />
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;
