import { useParams } from "react-router-dom";

export default function SpotifyPlaylistDetail() {
  const { id } = useParams();
  console.log(id);
  return <div>SpotifyPlaylistDetail {id}</div>;
}
