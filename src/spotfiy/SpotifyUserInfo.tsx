import SpotifyMe from "./models/SpotifyMe";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface IProps {
  spotifyMe: SpotifyMe;
  handleSpotifyLogout: () => void;
}

export default function SpotifyUserInfo(props: IProps) {
  return (
    <Card sx={{ display: "flex" }}>
      {/* <CardMedia component="img" sx={{ width: 151 }} image={spotifyMe?.images[1]?.url} /> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.spotifyMe.display_name}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
            {`${props.spotifyMe.followers.total} followers`}
            {` - ${props.spotifyMe.product}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.handleSpotifyLogout}>
            Logout
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
