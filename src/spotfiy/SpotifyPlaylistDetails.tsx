import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LocalStorageProvider from "../common/LocalStorageProvider";

export default function SpotifyPlaylistDetails() {
  const { libraryItemType, spotifyItemId } = useAppContext();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        Urls.SPOTIFY_API_URI + "playlists/" + spotifyItemId + "/tracks",
        {
          headers: {
            Authorization:
              "Bearer " + LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY),
          },
        }
      );
      console.log(response.data);
      //setData(response.data.items);
    })();
  }, []);

  return <div>Spotify Playlist Details {spotifyItemId}</div>;
}
