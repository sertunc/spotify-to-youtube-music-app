import { useParams } from "react-router-dom";

export default function SpotifyPlaylistDetails() {
  const { id } = useParams();
  console.log(id);
  return <div>Spotify Playlist Details {id}</div>;
}
