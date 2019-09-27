import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import { Menu, MenuItem, Typography, Badge } from "@material-ui/core";
import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon
} from "@material-ui/icons";

import IconButton from "../common/IconButton";

dayjs.extend(relativeTime);

const Notifications = ({ notifications, markNotificationsRead }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => setAnchorEl(event.target);
  const handleClose = event => setAnchorEl(null);

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(notif => !notif.read)
      .map(notif => notif.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  };

  const unReadNotificationsCount =
    notifications && notifications.length > 0
      ? notifications.filter(notif => notif.read === false).length
      : 0;

  const notificationsIcon =
    unReadNotificationsCount > 0 ? (
      <Badge badgeContent={unReadNotificationsCount} color="secondary">
        <NotificationsIcon />
      </Badge>
    ) : (
      <NotificationsIcon />
    );

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(notif => {
        const verb = notif.type === "like" ? "liked" : "commented on";
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? "disabled" : "primary";
        const fontWeight = notif.read ? "normal" : "bolder";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notif.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/users/${notif.recipient}/post/${notif.postId}`}
              color="textSecondary"
              variant="body1"
              style={{ fontWeight }}
            >
              {notif.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? "notifications-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        tip="Notifications"
      >
        {notificationsIcon}
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);
