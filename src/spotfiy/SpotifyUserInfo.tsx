import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export interface IProps {
  spotifyMe: SpotifyMe;
}

export default function SpotifyUserInfo(props: IProps) {
  return (
    <Card sx={{ display: "flex" }}>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.spotifyMe.images[1].url}
      /> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.spotifyMe.display_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`${props.spotifyMe.followers.total} followers`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
