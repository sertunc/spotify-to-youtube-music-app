import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import Item from "../common/Item";
import LocalStorageProvider from "../common/LocalStorageProvider";
import YoutubeMusicMe from "./models/YoutubeMusicMe";
import YoutubeMusicUserInfo from "./YoutubeMusicUserInfo";
import { LibraryItemType } from "../spotfiy/models/LibraryItemType";

export default function YoutubeMusicContainer() {
  const { openSnackbar } = useSnackbar();

  const [currentItem, setCurrentItem] = useState<LibraryItemType>(
    LibraryItemType.NONE
  );
  const [youtubeMusicMe, setYoutubeMusicMe] = useState<YoutubeMusicMe>(
    new YoutubeMusicMe()
  );

  const handleYoutubeMusicLogin = async () => {
    const spotifyCode =
      LocalStorageProvider.get(Constants.SPOTIFY_CODE_VERIFIER_KEY) || "";

    if (spotifyCode === "") {
      openSnackbar("Please first of all login with spotify", "error");
      return;
    }

    const ytMusicLoginResult = await axios.post(
      Urls.YOUTUBE_MUSIC_API_URI + "login",
      {
        userId: spotifyCode,
      }
    );

    if (ytMusicLoginResult.data.isSuccessful) {
      setYoutubeMusicMe(ytMusicLoginResult.data.data);
    } else {
      openSnackbar(ytMusicLoginResult.data.data.errors, "error");
    }
  };

  const handleItemClick = (itemType: LibraryItemType, link: string) => {
    setCurrentItem(itemType);
  };

  return youtubeMusicMe.title === "" ? (
    <Item>
      <Button onClick={handleYoutubeMusicLogin}>
        Login with Youtube Music
      </Button>
    </Item>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <YoutubeMusicUserInfo youtubeMusicMe={youtubeMusicMe} />
      </Grid>
      <Grid item xs={12}>
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
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
