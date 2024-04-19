import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import axios from "axios";
import Urls from "../Urls";

export interface IProps {
  spotifyToken: string;
}

export default function SpotifyPlaylists(props: IProps) {
  const [data, setData] = useState<PlaylistItem[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get(Urls.SPOTIFY_API_URI + "me/playlists", {
  //       headers: {
  //         Authorization: "Bearer " + props.spotifyToken,
  //       },
  //     });
  //     console.log(response.data);
  //     setData(response.data.items);
  //   })();
  // }, []);

  return (
    <>
      <Outlet />
      {data.map((item) => (
        <Card sx={{ display: "flex", marginBottom: 1 }} key={item.id}>
          <Link to={`playlists/${item.id}`}>
            <CardMedia
              sx={{ width: 60, height: 60 }}
              image={item.images[0].url}
            />
          </Link>
          <CardContent>
            <Link to={`playlists/${item.id}`}>
              <Typography component="div" variant="h6">
                {item.name}
              </Typography>
            </Link>
            {/* <Link href={item.external_urls.spotify}>Open in Spotify</Link> */}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
