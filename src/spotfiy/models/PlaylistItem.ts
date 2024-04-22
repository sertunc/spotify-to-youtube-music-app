interface PlaylistItem {
  id: string;
  name: string;
  uri: string;
  images: Image[];
  external_urls: { spotify: string };
  tracks: { total: number };
}

interface Image {
  url: string;
  height: number;
  width: number;
}
