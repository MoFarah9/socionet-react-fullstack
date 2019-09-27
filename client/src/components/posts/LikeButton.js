import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { likePost, unlikePost } from "../../redux/actions/dataActions";
import IconButton from "../common/IconButton";

const LikeButton = ({ user, postId, likePost, unlikePost }) => {
  const likedPost =
    user.likes && user.likes.find(like => like.postId === postId)
      ? true
      : false;

  const handleLikePost = () => likePost(postId);

  const handleUnlikePost = () => unlikePost(postId);

  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <IconButton tip="Like">
        <FavoriteBorder color="inherit" />
      </IconButton>
    </Link>
  ) : likedPost ? (
    <IconButton tip="Undo like" onClick={handleUnlikePost}>
      <FavoriteIcon color="secondary" />
    </IconButton>
  ) : (
    <IconButton tip="Like" onClick={handleLikePost}>
      <FavoriteBorder color="inherit" />
    </IconButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
