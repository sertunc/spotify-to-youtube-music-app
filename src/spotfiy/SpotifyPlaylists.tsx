import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LibraryListItem from "./components/LibraryListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";

export default function SpotifyPlaylists() {
  const { openSnackbar } = useSnackbar();

  const [data, setData] = useState<LibraryItem[]>([]);

  useEffect(() => {
    (async () => {
      const token = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(
          Urls.SPOTIFY_API_URI + "me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data: LibraryItem[] = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.images[0].url,
          url: item.external_urls.spotify,
          trackTotal: item.tracks.total,
        }));

        setData(data);
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, []);

  return data.map((item) => (
    <LibraryListItem key={item.id} pageLink="playlist" libraryItem={item} />
  ));
}
