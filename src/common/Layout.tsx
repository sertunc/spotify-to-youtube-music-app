import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SpotifyContainer from "../spotfiy/SpotifyContainer";
import YoutubeMusicContainer from "../youtubemusic/YoutubeMusicContainer";

export default function Layout(props: any) {
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={6}>
          <SpotifyContainer />
        </Grid>
        <Grid item xs={6}>
          <YoutubeMusicContainer />
        </Grid>
        <Grid item xs={12}>
          {getChildren(props)}
        </Grid>
      </Grid>
    </Container>
  );
}

function getChildren(props: any) {
  return React.Children.map(props.children, (child: any) => {
    return child;
  });
}
