import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LibraryListItem from "./components/LibraryListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";
import CommonStyles from "../common/CommonStyles";
import { Divider, Pagination, Stack } from "@mui/material";

export default function SpotifyAlbums() {
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
          `${Urls.SPOTIFY_API_URI}me/albums?limit=${model.limit}&offset=${model.offset}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data: LibraryItem[] = response.data.items.map((item: any) => ({
          id: item.album.id,
          name: item.album.name,
          imageUrl: item.album.images[1].url,
          url: item.album.external_urls.spotify,
          trackTotal: item.album.tracks.total,
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

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setModel((prevModel) => ({
      ...prevModel,
      offset: (page - 1) * prevModel.limit,
    }));
  };

  return (
    <>
      {model.data.map((item) => (
        <LibraryListItem key={item.id} pageLink="album" libraryItem={item} />
      ))}
      <div style={CommonStyles.paginationContainer}>
        <Divider />
        <Stack spacing={2}>
          <Pagination
            color="secondary"
            showFirstButton
            showLastButton
            count={Math.ceil(model.total / model.limit)}
            page={model.offset / model.limit + 1}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}
