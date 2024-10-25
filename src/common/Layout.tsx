import { useAppContext } from "../contexts/AppContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SpotifyUserInfoContainer from "../spotfiy/SpotifyUserInfoContainer";
import YoutubeMusicUserInfoContainer from "../youtubemusic/YoutubeMusicUserInfoContainer";
import SpotifyContainer from "../spotfiy/SpotifyContainer";

export default function Layout() {
  const { spotifyToken } = useAppContext();

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
          {spotifyToken !== "" ? <SpotifyContainer /> : null}
        </Grid>
        <Grid item xs={6}>
          {spotifyToken !== "" ? "youtube music content" : null}
        </Grid>
      </Grid>
    </Container>
  );
}
