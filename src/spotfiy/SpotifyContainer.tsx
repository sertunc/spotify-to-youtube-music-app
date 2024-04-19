import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Link } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import SpotifyUserInfo from "./SpotifyUserInfo";

export default function SpotifyContainer() {
  const navigate = useNavigate();

  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [spotifyToken, setSpotifyToken] = useState<string>("");

  const handleItemClick = (index: number, link: string) => {
    setCurrentItem(index);
    navigate(link);
  };

  useEffect(() => {
    (async () => {
      const hash = window.location.hash;
      const query = new URLSearchParams(hash.substring(1));
      const token = query.get("access_token");

      if (token) {
        localStorage.setItem(Constants.SPOTIFY_TOKEN_KEY, token ?? "");
        setSpotifyToken(token);
      }
    })();
  }, []);

  return spotifyToken === "" ? (
    <Item>
      <Link
        href={`${Urls.SPOTIFY_AUTH_ENDPOINT}?client_id=${Urls.SPOTIFY_CLIENT_ID}&redirect_uri=${Urls.SPOTIFY_REDIRECT_URI}&response_type=${Urls.SPOTIFY_RESPONSE_TYPE}`}
      >
        Login with Spotify
      </Link>
    </Item>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpotifyUserInfo />
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            variant={currentItem === 0 ? "contained" : "outlined"}
            onClick={() => handleItemClick(0, "playlists")}
          >
            Playlists
          </Button>
          <Button
            variant={currentItem === 1 ? "contained" : "outlined"}
            onClick={() => handleItemClick(1, "tracks")}
          >
            Saved Tracks
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
