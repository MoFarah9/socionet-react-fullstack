import React from "react";
import { Grid, Container } from "@material-ui/core";

import PostFeed from "../components/posts/PostFeed";
import Profile from "../components/profile/Profile";

const Home = () => (
  <div className="container">
    <Container>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item md={7} xs={12}>
          <PostFeed />
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default Home;
