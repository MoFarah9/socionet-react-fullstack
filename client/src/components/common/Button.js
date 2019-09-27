import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: props => (props.disablePill ? theme.shape.borderRadius : 25)
  }
}));

export default function Button({ children, ...others }) {
  const classes = useStyles(others);
  return (
    <MuiButton classes={{ root: classes.root }} {...others}>
      {children}
    </MuiButton>
  );
}
