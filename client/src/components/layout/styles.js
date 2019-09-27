import { fade } from "@material-ui/core/styles";

export default theme => ({
  ...theme.custom(theme),
  root: {
    borderBottom: theme.custom(theme).border,
    [theme.breakpoints.up("md")]: {
      height: 70
    },
    [theme.breakpoints.down("xs")]: {
      "& nav a": {}
    },
    "& .MuiButton-root": {
      textTransform: "none",
      letterSpacing: "normal"
    }
  },
  toolbar: {
    justifyContent: "space-between"
  },
  nav: {
    display: "flex",
    alignItems: "center"
  },
  navLeft: {
    "&>*": {
      marginLeft: theme.spacing(1)
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D8DCE6"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  logo: {
    maxHeight: 35,
    [theme.breakpoints.down("xs")]: {
      maxHeight: 25
    }
  }
});
