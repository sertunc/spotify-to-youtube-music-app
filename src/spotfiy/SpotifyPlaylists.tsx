import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as MuiLink,
} from "@mui/material";

import axios from "axios";
import Urls from "../enums/Urls";
import Constants from "../enums/Constants";
import CommonStyles from "../common/CommonStyles";

export default function SpotifyPlaylists() {
  const [data, setData] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(Urls.SPOTIFY_API_URI + "me/playlists", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(Constants.SPOTIFY_TOKEN_KEY),
        },
      });

      setData(response.data.items);
    })();
  }, []);

  return (
    <>
      {data.map((item) => (
        <Card
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
                {item.name}
              </Typography>
            </Link>
            <MuiLink
              style={CommonStyles.link}
              href={item.external_urls.spotify}
            >
              Open in Spotify
            </MuiLink>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
