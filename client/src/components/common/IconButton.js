import React from "react";

import { Tooltip, IconButton as MuiIconButton, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  buttonRoot: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tooltip: {
    fontSize: "0.8rem"
  }
});

export default ({ children, tip, tipClassName, btnClassName, ...others }) => {
  const classes = useStyles();
  const button = (
    <MuiIconButton
      classes={{ root: clsx(btnClassName, classes.buttonRoot) }}
      {...others}
    >
      {children}
    </MuiIconButton>
  );
  return tip ? (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={tip}
      enterDelay={500}
      TransitionComponent={Fade}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
};
