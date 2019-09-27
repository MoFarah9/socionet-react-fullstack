import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { getPosts } from "../../redux/actions/dataActions";

function PostFeed({ data, user, getPosts }) {
  useEffect(() => {
    getPosts();
  }, []);

  const { posts, loading } = data;

  return posts && posts.length > 0 ? (
    posts.map(post => <Post key={post.postId} post={post} currentUser={user} />)
  ) : loading ? (
    <PostSkeleton />
  ) : (
    <p>No posts to show</p>
  );
}

PostFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostFeed);
