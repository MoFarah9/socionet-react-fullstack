export const muiStyles = {
  palette: {
    primary: {
      main: "#797BE2"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
};

export const customStyles = theme => ({
  border: "1px solid #EAEDF3",
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    margin: "1rem 0 1rem",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.1)"
  },
  paper: {
    padding: 20,
    minWidth: 250
  },
  profilePaper: {
    padding: 20,
    minWidth: 250,
    background: " linear-gradient(45deg, rgb(171, 105, 243), #797BE2)"
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    "& .image-wrapper": {
      marginBottom: "1rem",
      overflow: "hidden",
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      borderRadius: "50%",
      border: "5px solid #fff"
    },
    "& .profile-details": {
      color: "#fff",
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#fff"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg": {
      color: "#fff"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    },
    "& .edit-btn": {
      alignSelf: "flex-end"
    },
    [theme.breakpoints.only("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "column"
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});
