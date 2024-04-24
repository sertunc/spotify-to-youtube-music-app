import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import SpotifyUserInfo from "./SpotifyUserInfo";
import { ItemType } from "./models/ItemType";
import { getCodeChallenge, getCodeVerifier, getToken } from "./SpotifyService";

export default function SpotifyContainer() {
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();

  const [currentItem, setCurrentItem] = useState<ItemType>(ItemType.NONE);
  const [spotifyToken, setSpotifyToken] = useState<string>(() => {
    return localStorage.getItem(Constants.SPOTIFY_TOKEN_KEY) || "";
  });

  const handleItemClick = (itemType: ItemType, link: string) => {
    setCurrentItem(itemType);
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
            variant={
              currentItem === ItemType.PLAYLIST ? "contained" : "outlined"
            }
            onClick={() => handleItemClick(ItemType.PLAYLIST, "playlists")}
          >
            Playlists
          </Button>
          <Button
            variant={currentItem === ItemType.TRACK ? "contained" : "outlined"}
            onClick={() => handleItemClick(ItemType.TRACK, "tracks")}
          >
            Saved Tracks
          </Button>
          <Button
            variant={currentItem === ItemType.ALBUM ? "contained" : "outlined"}
            onClick={() => handleItemClick(ItemType.ALBUM, "albums")}
          >
            Saved Albums
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
