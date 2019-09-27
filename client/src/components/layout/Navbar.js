import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import logoImg from "../../images/icon.png";

import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  InputBase
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";

import NewPost from "../posts/NewPost";
import Notifications from "./Notifications";
import UserAvatar from "./UserAvatar";
import Button from "../common/Button";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    style: trigger
      ? { boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)" }
      : { boxShadow: "none" }
  });
};

const SearchInput = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon fontSize="small" />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

const Navbar = ({ authenticated }) => {
  const classes = useStyles();
  return (
    <ElevationScroll>
      <AppBar color="inherit" classes={{ root: classes.root }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Link to="/">
            <img src={logoImg} alt="SocioNet logo" className={classes.logo} />
          </Link>
          <SearchInput classes={classes} />
          <nav className={clsx(classes.nav, classes.navLeft)}>
            {authenticated ? (
              <>
                <NewPost />
                <Notifications />
                <UserAvatar />
              </>
            ) : (
              <>
                <Button color="primary" component={Link} to="/signup">
                  Join Us
                </Button>
                <Button
                  color="primary"
                  component={Link}
                  to="/login"
                  variant="outlined"
                >
                  Login
                </Button>
              </>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
