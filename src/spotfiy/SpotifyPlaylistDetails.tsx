import { useEffect, useState } from "react";
import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import { PlaylistItem } from "./models/SpotifyPlaylist";
import { useParams } from "react-router-dom";

export default function SpotifyPlaylistDetails() {
  const { id } = useParams();

  //const [data, setData] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        Urls.SPOTIFY_API_URI + "playlists/" + id + "/tracks",
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem(Constants.SPOTIFY_TOKEN_KEY),
          },
        }
      );
      console.log(response.data);
      //setData(response.data.items);
    })();
  }, []);

  return <div>Spotify Playlist Details {id}</div>;
}
