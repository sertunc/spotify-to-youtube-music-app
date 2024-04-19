import { Grid } from "@mui/material";
import SpotifyContainer from "../spotfiy/SpotifyContainer";
import YoutubeMusicContainer from "../youtubemusic/YoutubeMusicContainer";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SpotifyContainer />
      </Grid>
      <Grid item xs={6}>
        <YoutubeMusicContainer />
      </Grid>
    </Grid>
  );
}
