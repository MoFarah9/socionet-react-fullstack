import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Link as MuiLink,
  CardActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ChatIcon from "@material-ui/icons/Chat";

import IconButton from "../common/IconButton";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

dayjs.extend(relativeTime);

const styles = {
  card: {
    minWidth: 300,
    maxWidth: 700,
    margin: "0 auto 2rem",
    "& .handle": {
      fontSize: "1rem"
    }
  }
};
const useStyles = makeStyles(styles);

const Post = ({ currentUser, post, openDialog }) => {
  const classes = useStyles();
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    postId,
    likeCount,
    commentCount
  } = post;

  const deleteButton =
    currentUser &&
    currentUser.authenticated &&
    userHandle === currentUser.credentials.handle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="user avatar"
            src={userImage}
            alt="Profile image"
          />
        }
        action={deleteButton}
        title={
          <MuiLink
            component={Link}
            to={`/users/${userHandle}`}
            color="textPrimary"
            className="handle"
          >
            {userHandle}
          </MuiLink>
        }
        subheader={dayjs(createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="body1" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton postId={postId} />
        <Typography variant="body2" color="textSecondary">
          {likeCount} Likes
        </Typography>
        <IconButton tip="comments">
          <ChatIcon color={commentCount > 0 ? "primary" : "disabled"} />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {commentCount} comments
        </Typography>
        <PostDialog
          postId={postId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardActions>
    </Card>
  );
};

Post.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired
};

export default Post;
