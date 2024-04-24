export default class SpotifyMe {
  display_name: string = "";
  product: string = "";
  followers: Followers = new Followers();
  images: Image[] = [];
}

export class Image {
  url: string = "";
  height: number = 0;
  width: number = 0;
}

export class Followers {
  href: string = "";
  total: number = 0;
}
