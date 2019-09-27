import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Container } from "@material-ui/core";
// local
import { getUserData } from "../redux/actions/dataActions";
import Post from "../components/posts/Post";
import StaticProfile from "../components/profile/StaticProfile";
import PostSkeleton from "../components/posts/PostSkeleton";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";

const User = ({ data, getUserData, match }) => {
  const { handle, postId } = match.params;

  useEffect(() => {
    getUserData(handle);
  }, [handle]);

  const { userData, loading } = data;

  const postsMarkup = loading ? (
    <PostSkeleton />
  ) : !userData || !userData.posts || userData.posts.length === 0 ? (
    <p>No posts from this user</p>
  ) : !postId ? (
    userData.posts.map(post => <Post key={post.postId} post={post} />)
  ) : (
    userData.posts.map(post => {
      if (post.postId !== postId) {
        return <Post key={post.postId} post={post} />;
      } else {
        return <Post key={post.postId} post={post} openDialog />;
      }
    })
  );

  return (
    <div className="container">
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            {!loading && userData && userData.user ? (
              <StaticProfile profile={userData.user} />
            ) : (
              <ProfileSkeleton />
            )}
          </Grid>
          <Grid item md={7} xs={12}>
            {postsMarkup}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
