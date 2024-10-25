import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import LocalStorageProvider from "../common/LocalStorageProvider";
import { LibraryItemType } from "./models/LibraryItemType";
import Pager from "../common/Pager";
import CustomYesNoDialog from "../common/CustomYesNoDialog";
import TrackListItem from "./components/TrackListItem";

export default function SpotifyAlbumDetails() {
  const { openSnackbar } = useSnackbar();
  const { spotifyItemId, spotifyItemName } = useAppContext();

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
          `${Urls.SPOTIFY_API_URI}albums/${spotifyItemId}/tracks?limit=${model.limit}&offset=${model.offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        const data: TrackItem[] = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          albumName: "",
          artistName: item.artists[0].name,
          imageUrl: "",
          url: item.external_urls.spotify,
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
      {spotifyItemName} Album Details
      {model.data.map((item) => (
        <TrackListItem key={item.id} trackItem={item} handleDelete={handleDelete} />
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
