import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Menu, MenuItem, IconButton } from "@material-ui/core";
import noImg from "../../images/no-img.png";
import { logoutUser } from "../../redux/actions/userActions";

const StyledMenu = withStyles(theme => ({
  paper: {
    border: theme.custom.border
  }
}))(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

function UserAvatar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logoutUser } = props;
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0, backgroundColor: "#AAA" }}
      >
        <Avatar alt="User" src={user.imageUrl || noImg} />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={`/users/${user.handle}`}>
          My Posts
        </MenuItem>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </StyledMenu>
    </div>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapState = state => ({
  user: state.user.credentials
});

export default connect(
  mapState,
  { logoutUser }
)(UserAvatar);
