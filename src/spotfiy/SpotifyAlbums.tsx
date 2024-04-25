import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LibraryListItem from "./components/LibraryListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";

export default function SpotifyAlbums() {
  const { openSnackbar } = useSnackbar();

  const [data, setData] = useState<LibraryItem[]>([]);

  useEffect(() => {
    (async () => {
      const token = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(Urls.SPOTIFY_API_URI + "me/albums", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data: LibraryItem[] = response.data.items.map((item: any) => ({
          id: item.album.id,
          name: item.album.name,
          imageUrl: item.album.images[1].url,
          url: item.album.external_urls.spotify,
          trackTotal: item.album.tracks.total,
        }));

        setData(data);
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, []);

  return data.map((item) => (
    <LibraryListItem key={item.id} pageLink="album" libraryItem={item} />
  ));
}
