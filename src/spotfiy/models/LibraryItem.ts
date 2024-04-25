interface LibraryCollection {
  data: LibraryItem[];
  total: number;
  offset: number;
  limit: number;
}

interface LibraryItem {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  trackTotal: number;
}
