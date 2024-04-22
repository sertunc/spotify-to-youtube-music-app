import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Link as MuiLink,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import CommonStyles from "../common/CommonStyles";

export default function SpotifyTracks() {
  const { openSnackbar } = useSnackbar();

  const [data, setData] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(Constants.SPOTIFY_TOKEN_KEY);
      if (token) {
        const response = await axios.get(Urls.SPOTIFY_API_URI + "me/tracks", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        //setData(response.data.items);
      } else {
        openSnackbar("Please login with spotify", "error");
      }
    })();
  }, []);

  return (
    <>
      {data.map((item) => (
        <Card
          variant="outlined"
          style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          key={item.id}
        >
          <Link style={CommonStyles.link} to={`/playlist/${item.id}`}>
            <CardMedia
              sx={{ width: 60, height: 60, marginLeft: 2 }}
              image={item.images[0].url}
            />
          </Link>
          <CardContent>
            <Link style={CommonStyles.link} to={`/playlist/${item.id}`}>
              <Typography component="div" variant="h6">
                {item.name} ({item.tracks.total})
              </Typography>
            </Link>
            <MuiLink
              style={CommonStyles.link}
              href={item.external_urls.spotify}
            >
              Open in Spotify
            </MuiLink>
          </CardContent>
          <CardActions style={{ marginLeft: "auto" }}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
