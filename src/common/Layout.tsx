import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SpotifyUserInfoContainer from "../spotfiy/SpotifyUserInfoContainer";
import YoutubeMusicUserInfoContainer from "../youtubemusic/YoutubeMusicUserInfoContainer";

export default function Layout(props: any) {
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={6}>
          <SpotifyUserInfoContainer />
        </Grid>
        <Grid item xs={6}>
          <YoutubeMusicUserInfoContainer />
        </Grid>
        <Grid item xs={6}>
          spotify content
        </Grid>
        <Grid item xs={6}>
          youtube music content
        </Grid>
      </Grid>
    </Container>
  );
}
