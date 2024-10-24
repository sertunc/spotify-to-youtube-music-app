import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import { Button } from "@mui/material";
import { getCodeChallenge, getCodeVerifier, getToken } from "./SpotifyService";
import Item from "../common/Item";
import LocalStorageProvider from "../common/LocalStorageProvider";
import Constants from "../enums/Constants";
import Urls from "../enums/Urls";
import SpotifyMe from "./models/SpotifyMe";
import SpotifyUserInfo from "./SpotifyUserInfo";

export default function SpotifyUserInfoContainer() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const [spotifyMe, setSpotifyMe] = useState<SpotifyMe>(new SpotifyMe());
  const [spotifyToken, setSpotifyToken] = useState<string>(() => {
    return LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY) || "";
  });

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get("code") || "";

      if (code) {
        const codeVerifier = LocalStorageProvider.get(Constants.SPOTIFY_CODE_VERIFIER_KEY) || "";

        const tokenEndpoint = Urls.SPOTIFY_TOKEN_ENDPOINT;
        const clientId = Constants.SPOTIFY_CLIENT_ID;
        const redirectUri = Urls.SPOTIFY_REDIRECT_URI;

        const result = await getToken(tokenEndpoint, code, codeVerifier, clientId, redirectUri);

        if (result.access_token) {
          LocalStorageProvider.set(Constants.SPOTIFY_TOKEN_KEY, result.access_token ?? "");
          setSpotifyToken(result.access_token);

          getSpotifyMe(result.access_token);

          navigate("/");
        }
      } else if (spotifyToken) {
        getSpotifyMe(spotifyToken);
      }
    })();
  }, []);

  const getSpotifyMe = async (token: string) => {
    try {
      const response = await axios.get(Urls.SPOTIFY_API_URI + "me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSpotifyMe(response.data);

      openSnackbar("Login successfully to spotify", "success");
    } catch (error: any) {
      if (error.response.status === 401) {
        LocalStorageProvider.clear();
        openSnackbar("Please login with spotify", "error");
      }
    }
  };

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

  const handleSpotifyLogout = () => {
    LocalStorageProvider.clear();

    window.location.reload();
  };

  return spotifyToken === "" ? (
    <Item>
      <Button onClick={handleSpotifyLogin}>Login Spotify</Button>
    </Item>
  ) : (
    <SpotifyUserInfo spotifyMe={spotifyMe} handleSpotifyLogout={handleSpotifyLogout} />
  );
}
