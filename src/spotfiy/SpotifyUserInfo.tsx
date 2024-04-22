import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import SpotifyMe from "./models/SpotifyMe";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function SpotifyUserInfo() {
  const { openSnackbar } = useSnackbar();

  const [spotifyMe, setSpotifyMe] = useState<SpotifyMe>(new SpotifyMe());

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(Urls.SPOTIFY_API_URI + "me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setSpotifyMe(response.data);
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, []);

  return (
    spotifyMe && (
      <Card sx={{ display: "flex" }}>
        {/* <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={spotifyMe.images[1].url}
        /> */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {spotifyMe.display_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${spotifyMe.followers.total} followers`}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    )
  );
}
