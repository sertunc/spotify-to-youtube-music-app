import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import SpotifyUserInfo from "./SpotifyUserInfo";
import { getCodeChallenge, getCodeVerifier, getToken } from "./SpotifyService";

export default function SpotifyContainer() {
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();

  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [spotifyToken, setSpotifyToken] = useState<string>("");

  const handleItemClick = (index: number, link: string) => {
    setCurrentItem(index);
    navigate(link);
  };

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get("code") || "";

      if (code) {
        const codeVerifier =
          localStorage.getItem(Constants.SPOTIFY_CODE_VERIFIER_KEY) || "";

        const tokenEndpoint = Urls.SPOTIFY_TOKEN_ENDPOINT;
        const clientId = Constants.SPOTIFY_CLIENT_ID;
        const redirectUri = Urls.SPOTIFY_REDIRECT_URI;

        const result = await getToken(
          tokenEndpoint,
          code,
          codeVerifier,
          clientId,
          redirectUri
        );
        if (result.access_token) {
          localStorage.setItem(
            Constants.SPOTIFY_TOKEN_KEY,
            result.access_token ?? ""
          );

          setSpotifyToken(result.access_token);

          openSnackbar("Login successfully", "success");
        }
      }
    })();
  }, []);

  const handleSpotifyLogin = async () => {
    const codeVerifier = getCodeVerifier();
    const codeChallenge = await getCodeChallenge(codeVerifier);

    localStorage.setItem(Constants.SPOTIFY_CODE_VERIFIER_KEY, codeVerifier);

    const authUrl = new URL(Urls.SPOTIFY_AUTHORIZATION_ENDPOINT);
    const params = {
      response_type: "code",
      client_id: Constants.SPOTIFY_CLIENT_ID,
      scope: Constants.SPOTIFY_SCOPE,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: Urls.SPOTIFY_REDIRECT_URI,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return spotifyToken === "" ? (
    <Item>
      <Button onClick={handleSpotifyLogin}>Login with Spotify</Button>
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
