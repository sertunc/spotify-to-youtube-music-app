import { useState } from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { LibraryItemType } from "../spotfiy/models/LibraryItemType";

export default function YoutubeMusicContainer() {
  const [currentItem, setCurrentItem] = useState<LibraryItemType>(LibraryItemType.NONE);

  const handleItemClick = (itemType: LibraryItemType, link: string) => {
    setCurrentItem(itemType);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <ButtonGroup variant="outlined">
            <Button
              variant={currentItem === LibraryItemType.PLAYLIST ? "contained" : "outlined"}
              onClick={() => handleItemClick(LibraryItemType.PLAYLIST, "playlists")}
            >
              Playlists
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
