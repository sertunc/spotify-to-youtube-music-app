import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useAppContext } from "../contexts/AppContext";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import SpotifyUserInfo from "./SpotifyUserInfo";
import { LibraryItemType } from "./models/LibraryItemType";
import { getCodeChallenge, getCodeVerifier, getToken } from "./SpotifyService";
import LocalStorageProvider from "../common/LocalStorageProvider";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifyTracks from "./SpotifyTracks";
import SpotifyAlbums from "./SpotifyAlbums";
import SpotifyPlaylistDetails from "./SpotifyPlaylistDetails";
import SpotifyAlbumDetails from "./SpotifyAlbumDetails";

export default function SpotifyContainer() {
  const { spotifyItemId, libraryItemType, clearLibraryItemType } =
    useAppContext();
  const { openSnackbar } = useSnackbar();

  const [currentItem, setCurrentItem] = useState<LibraryItemType>(
    LibraryItemType.NONE
  );
  const [spotifyToken, setSpotifyToken] = useState<string>(() => {
    return LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY) || "";
  });

  const handleItemClick = (itemType: LibraryItemType, link: string) => {
    clearLibraryItemType();
    setCurrentItem(itemType);
  };

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get("code") || "";

      if (code) {
        const codeVerifier =
          LocalStorageProvider.get(Constants.SPOTIFY_CODE_VERIFIER_KEY) || "";

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
          LocalStorageProvider.set(
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

    LocalStorageProvider.set(Constants.SPOTIFY_CODE_VERIFIER_KEY, codeVerifier);

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
        <ButtonGroup variant="outlined">
          <Button
            variant={
              currentItem === LibraryItemType.PLAYLIST
                ? "contained"
                : "outlined"
            }
            onClick={() =>
              handleItemClick(LibraryItemType.PLAYLIST, "playlists")
            }
          >
            Playlists
          </Button>
          <Button
            variant={
              currentItem === LibraryItemType.TRACK ? "contained" : "outlined"
            }
            onClick={() => handleItemClick(LibraryItemType.TRACK, "tracks")}
          >
            Saved Tracks
          </Button>
          <Button
            variant={
              currentItem === LibraryItemType.ALBUM ? "contained" : "outlined"
            }
            onClick={() => handleItemClick(LibraryItemType.ALBUM, "albums")}
          >
            Saved Albums
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {currentItem === LibraryItemType.PLAYLIST &&
          libraryItemType === LibraryItemType.NONE && <SpotifyPlaylists />}

        {currentItem === LibraryItemType.PLAYLIST &&
          libraryItemType === LibraryItemType.PLAYLIST && (
            <SpotifyPlaylistDetails />
          )}

        {currentItem === LibraryItemType.TRACK &&
          libraryItemType === LibraryItemType.NONE && <SpotifyTracks />}

        {currentItem === LibraryItemType.ALBUM &&
          libraryItemType === LibraryItemType.NONE && <SpotifyAlbums />}

        {currentItem === LibraryItemType.ALBUM &&
          libraryItemType === LibraryItemType.ALBUM && <SpotifyAlbumDetails />}
      </Grid>
    </Grid>
  );
}
