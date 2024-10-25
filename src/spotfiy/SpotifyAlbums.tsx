import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { LibraryItemType } from "./models/LibraryItemType";
import axios from "axios";
import Urls from "../enums/Urls";
import LibraryListItem from "./components/LibraryListItem";
import CustomYesNoDialog from "../common/CustomYesNoDialog";
import Pager from "../common/Pager";

export default function SpotifyAlbums() {
  const { openSnackbar } = useSnackbar();
  const { spotifyToken } = useAppContext();

  const [showModal, setShowModal] = useState({
    open: false,
    id: "",
  });

  const [model, setModel] = useState<LibraryCollection>({
    data: [],
    total: 0,
    offset: 0,
    limit: 10,
  });

  useEffect(() => {
    (async () => {
      if (spotifyToken) {
        const response = await axios.get(
          `${Urls.SPOTIFY_API_URI}me/albums?limit=${model.limit}&offset=${model.offset}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
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
  }, [model.offset, showModal.open]);

  const handleDelete = async (id: string) => {
    setShowModal({
      open: true,
      id: id,
    });
  };

  const handleDeleteConfirm = async () => {
    if (spotifyToken) {
      await axios.delete(`${Urls.SPOTIFY_API_URI}me/albums`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
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
        <LibraryListItem
          key={item.id}
          libraryItemType={LibraryItemType.ALBUM}
          libraryItem={item}
          showDelete={true}
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
          contentMessage="Are you sure you want to delete this album?"
          open={showModal.open}
          onClose={() => setShowModal({ open: false, id: "" })}
          onYesClick={handleDeleteConfirm}
        />
      )}
    </>
  );
}
