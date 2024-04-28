import { SnackbarProvider } from "./contexts/SnackbarContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./common/Home";
import Page404 from "./common/Page404";
import SpotifyPlaylists from "./spotfiy/SpotifyPlaylists";
import SpotifyPlaylistDetail from "./spotfiy/SpotifyPlaylistDetails";
import SpotifyTracks from "./spotfiy/SpotifyTracks";
import SpotifyAlbums from "./spotfiy/SpotifyAlbums";
import SpotifyAlbumDetails from "./spotfiy/SpotifyAlbumDetails";

export default function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Page404 />} />
            <Route path="playlists" element={<SpotifyPlaylists />} />
            <Route path="playlist/:id" element={<SpotifyPlaylistDetail />} />
            <Route path="tracks" element={<SpotifyTracks />} />
            <Route path="albums" element={<SpotifyAlbums />} />
            <Route path="album/:id" element={<SpotifyAlbumDetails />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
