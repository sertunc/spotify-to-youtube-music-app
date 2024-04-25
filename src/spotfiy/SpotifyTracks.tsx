import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import TrackListItem from "./components/TrackListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";

export default function SpotifyTracks() {
  const { openSnackbar } = useSnackbar();

  const [data, setData] = useState<TrackItem[]>([]);

  useEffect(() => {
    (async () => {
      const token = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(Urls.SPOTIFY_API_URI + "me/tracks", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);

        const data: TrackItem[] = response.data.items.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          albumName: item.track.album.name,
          artistName: item.track.artists[0].name,
          imageUrl: item.track.album.images[0].url,
          url: item.track.external_urls.spotify,
        }));

        setData(data);
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, []);

  return data.map((item) => (
    <TrackListItem key={item.id} pageLink="track" trackItem={item} />
  ));
}
