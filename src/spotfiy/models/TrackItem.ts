interface TrackCollection {
  data: TrackItem[];
  total: number;
  offset: number;
  limit: number;
}

interface TrackItem {
  id: string;
  name: string;
  albumName: string;
  artistName: string;
  imageUrl: string;
  url: string;
}
