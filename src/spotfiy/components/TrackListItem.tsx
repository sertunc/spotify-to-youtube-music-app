import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonStyles from "../../common/CommonStyles";

interface IProps {
  trackItem: TrackItem;
  pageLink?: string;
  handleDelete: (id: string) => void;
}

export default function TrackListItem(props: IProps) {
  return (
    <Card
      variant="outlined"
      style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
      key={props.trackItem.id}
    >
      <MuiLink
        style={CommonStyles.link}
        href={`/${props.pageLink}/${props.trackItem.id}`}
      >
        <CardMedia
          sx={{ width: 60, height: 60, marginLeft: 2 }}
          image={props.trackItem.imageUrl}
        />
      </MuiLink>
      <CardContent>
        <MuiLink
          style={CommonStyles.link}
          href={`/${props.pageLink}/${props.trackItem.id}`}
        >
          <Typography component="div" variant="h6">
            {props.trackItem.artistName} - {props.trackItem.albumName} -{" "}
            {props.trackItem.name}
          </Typography>
        </MuiLink>
        <MuiLink style={CommonStyles.link} href={props.trackItem.url}>
          Open in Spotify
        </MuiLink>
      </CardContent>
      <CardActions style={{ marginLeft: "auto" }}>
        <IconButton onClick={() => props.handleDelete(props.trackItem.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
