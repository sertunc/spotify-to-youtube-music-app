import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { LibraryItemType } from "./models/LibraryItemType";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifyTracks from "./SpotifyTracks";
import SpotifyAlbums from "./SpotifyAlbums";
import SpotifyPlaylistDetails from "./SpotifyPlaylistDetails";
import SpotifyAlbumDetails from "./SpotifyAlbumDetails";

export default function SpotifyContainer() {
  const { spotifyItemId, libraryItemType, clearLibraryItemType } = useAppContext();

  const [currentItem, setCurrentItem] = useState<LibraryItemType>(LibraryItemType.NONE);

  const handleItemClick = (itemType: LibraryItemType, link: string) => {
    clearLibraryItemType();
    setCurrentItem(itemType);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <SpotifyUserInfo /> */}
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup variant="outlined">
          <Button
            variant={currentItem === LibraryItemType.PLAYLIST ? "contained" : "outlined"}
            onClick={() => handleItemClick(LibraryItemType.PLAYLIST, "playlists")}
          >
            Playlists
          </Button>
          <Button
            variant={currentItem === LibraryItemType.TRACK ? "contained" : "outlined"}
            onClick={() => handleItemClick(LibraryItemType.TRACK, "tracks")}
          >
            Saved Tracks
          </Button>
          <Button
            variant={currentItem === LibraryItemType.ALBUM ? "contained" : "outlined"}
            onClick={() => handleItemClick(LibraryItemType.ALBUM, "albums")}
          >
            Saved Albums
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {currentItem === LibraryItemType.PLAYLIST && libraryItemType === LibraryItemType.NONE && (
          <SpotifyPlaylists />
        )}

        {currentItem === LibraryItemType.PLAYLIST &&
          libraryItemType === LibraryItemType.PLAYLIST && <SpotifyPlaylistDetails />}

        {currentItem === LibraryItemType.TRACK && libraryItemType === LibraryItemType.NONE && (
          <SpotifyTracks />
        )}

        {currentItem === LibraryItemType.ALBUM && libraryItemType === LibraryItemType.NONE && (
          <SpotifyAlbums />
        )}

        {currentItem === LibraryItemType.ALBUM && libraryItemType === LibraryItemType.ALBUM && (
          <SpotifyAlbumDetails />
        )}
      </Grid>
    </Grid>
  );
}
