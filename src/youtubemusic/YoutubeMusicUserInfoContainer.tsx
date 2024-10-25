import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button } from "@mui/material";
import Urls from "../enums/Urls";
import Item from "../common/Item";
import YoutubeMusicMe from "./models/YoutubeMusicMe";
import YoutubeMusicUserInfo from "./YoutubeMusicUserInfo";

export default function YoutubeMusicUserInfoContainer() {
  const { openSnackbar } = useSnackbar();
  const { spotifyToken, setSpotifyToken } = useAppContext();

  const [youtubeMusicMe, setYoutubeMusicMe] = useState<YoutubeMusicMe>(new YoutubeMusicMe());

  useEffect(() => {
    (async () => {
      if (spotifyToken !== "") {
        await getYoutubeMusicMe(spotifyToken);
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
    if (spotifyToken === "") {
      openSnackbar("Please first of all login with spotify", "error");
      return;
    }

    await getYoutubeMusicMe(spotifyToken);
  };

  const handleYoutubeMusicLogout = () => {
    setSpotifyToken("");

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
