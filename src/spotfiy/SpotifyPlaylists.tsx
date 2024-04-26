import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LibraryListItem from "./components/LibraryListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";
import Pager from "../common/Pager";

export default function SpotifyPlaylists() {
  const { openSnackbar } = useSnackbar();

  const [model, setModel] = useState<LibraryCollection>({
    data: [],
    total: 0,
    offset: 0,
    limit: 10,
  });

  useEffect(() => {
    (async () => {
      const token = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(
          `${Urls.SPOTIFY_API_URI}me/playlists?limit=${model.limit}&offset=${model.offset}`,
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

        setModel({
          data: data,
          limit: response.data.limit,
          offset: response.data.offset,
          total: response.data.total,
        });
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, [model.offset]);

  const handleChange = (event: any, page: number) => {
    setModel((prevModel) => ({
      ...prevModel,
      offset: (page - 1) * prevModel.limit,
    }));
  };

  return (
    <>
      {model.data.map((item) => (
        <LibraryListItem key={item.id} pageLink="playlist" libraryItem={item} />
      ))}
      <Pager
        total={model.total}
        offset={model.offset}
        limit={model.limit}
        handleChange={handleChange}
      />
    </>
  );
}
