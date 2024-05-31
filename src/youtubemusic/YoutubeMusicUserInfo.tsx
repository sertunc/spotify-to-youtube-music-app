import { Box, Card, CardContent, Typography } from "@mui/material";
import YoutubeMusicMe from "./models/YoutubeMusicMe";

interface IProps {
  youtubeMusicMe: YoutubeMusicMe;
}

export default function YoutubeMusicUserInfo(props: IProps) {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.youtubeMusicMe.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.youtubeMusicMe.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
