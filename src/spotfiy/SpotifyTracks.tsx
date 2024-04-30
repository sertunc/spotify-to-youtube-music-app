import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import TrackListItem from "./components/TrackListItem";
import LocalStorageProvider from "../common/LocalStorageProvider";
import CustomYesNoDialog from "../common/CustomYesNoDialog";
import Pager from "../common/Pager";

export default function SpotifyTracks() {
  const { openSnackbar } = useSnackbar();

  const [showModal, setShowModal] = useState({
    open: false,
    id: "",
  });

  const [model, setModel] = useState<TrackCollection>({
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
          `${Urls.SPOTIFY_API_URI}me/tracks?limit=${model.limit}&offset=${model.offset}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data: TrackItem[] = response.data.items.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          albumName: item.track.album.name,
          artistName: item.track.artists[0].name,
          imageUrl: item.track.album.images[0].url,
          url: item.track.external_urls.spotify,
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
  }, [model.offset, showModal.open]);

  const handleDelete = async (id: string) => {
    setShowModal({
      open: true,
      id: id,
    });
  };

  const handleDeleteConfirm = async () => {
    const token = LocalStorageProvider.get(Constants.SPOTIFY_TOKEN_KEY);
    if (token) {
      await axios.delete(`${Urls.SPOTIFY_API_URI}me/tracks`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          ids: [showModal.id],
        },
      });

      setShowModal({ open: false, id: "" });
    } else {
      openSnackbar("Please login with spotify", "error");
    }
  };

  const handleChange = (event: any, page: number) => {
    setModel((prevModel) => ({
      ...prevModel,
      offset: (page - 1) * prevModel.limit,
    }));
  };

  return (
    <>
      {model.data.map((item) => (
        <TrackListItem
          key={item.id}
          pageLink="track"
          trackItem={item}
          handleDelete={handleDelete}
        />
      ))}
      <Pager
        total={model.total}
        offset={model.offset}
        limit={model.limit}
        handleChange={handleChange}
      />
      {showModal.open && (
        <CustomYesNoDialog
          titleMessage="Warning!"
          contentMessage="Are you sure you want to delete this track?"
          open={showModal.open}
          onClose={() => setShowModal({ open: false, id: "" })}
          onYesClick={handleDeleteConfirm}
        />
      )}
    </>
  );
}
