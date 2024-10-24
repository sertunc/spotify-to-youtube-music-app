import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import LocalStorageProvider from "../common/LocalStorageProvider";
import YoutubeMusicMe from "./models/YoutubeMusicMe";
import YoutubeMusicUserInfo from "./YoutubeMusicUserInfo";

export default function YoutubeMusicUserInfoContainer() {
  const { openSnackbar } = useSnackbar();

  const [youtubeMusicMe, setYoutubeMusicMe] = useState<YoutubeMusicMe>(new YoutubeMusicMe());

  useEffect(() => {
    (async () => {
      const spotifyCode = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY) || "";

      if (spotifyCode !== "") {
        await getYoutubeMusicMe(spotifyCode);
      }
    })();
  }, []);

  const getYoutubeMusicMe = async (spotifyCode: string) => {
    const ytMusicLoginResult = await axios.post(Urls.YOUTUBE_MUSIC_API_URI + "login", {
      userId: spotifyCode.slice(-10),
    });

    if (ytMusicLoginResult.data.isSuccessful) {
      setYoutubeMusicMe(ytMusicLoginResult.data.data);
      openSnackbar("Login successfully to youtube music", "success");
    } else {
      openSnackbar(ytMusicLoginResult.data.data.errors, "error");
    }
  };

  const handleYoutubeMusicLogin = async () => {
    const spotifyCode = LocalStorageProvider.get(Constants.SPOTIFY_CODE_VERIFIER_KEY) || "";

    if (spotifyCode === "") {
      openSnackbar("Please first of all login with spotify", "error");
      return;
    }

    await getYoutubeMusicMe(spotifyCode);
  };

  const handleYoutubeMusicLogout = () => {
    LocalStorageProvider.clear();

    window.location.reload();
  };

  return youtubeMusicMe.title === "" ? (
    <Item>
      <Button onClick={handleYoutubeMusicLogin}>Login Youtube Music</Button>
    </Item>
  ) : (
    <YoutubeMusicUserInfo
      youtubeMusicMe={youtubeMusicMe}
      handleYoutubeMusicLogout={handleYoutubeMusicLogout}
    />
  );
}
