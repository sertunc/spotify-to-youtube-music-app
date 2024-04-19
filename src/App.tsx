import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./common/Home";
import Page404 from "./common/Page404";
import SpotifyPlaylists from "./spotfiy/SpotifyPlaylists";
import SpotifyPlaylistDetail from "./spotfiy/SpotifyPlaylistDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
          <Route
            path="playlists"
            element={<SpotifyPlaylists spotifyToken="" />}
          >
            <Route path=":id" element={<SpotifyPlaylistDetail />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
