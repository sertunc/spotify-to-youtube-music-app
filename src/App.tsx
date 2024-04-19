import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./common/Home";
import Page404 from "./common/Page404";
import SpotifyPlaylists from "./spotfiy/SpotifyPlaylists";
import SpotifyPlaylistDetail from "./spotfiy/SpotifyPlaylistDetails";
import SpotifyTracks from "./spotfiy/SpotifyTracks";
import SpotifyTrackDetails from "./spotfiy/SpotifyTrackDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
          <Route path="playlists" element={<SpotifyPlaylists />} />
          <Route path="playlist/:id" element={<SpotifyPlaylistDetail />} />
          <Route path="tracks" element={<SpotifyTracks />} />
          <Route path="track/:id" element={<SpotifyTrackDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
