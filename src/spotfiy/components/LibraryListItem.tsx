import { Link } from "react-router-dom";
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
  libraryItem: LibraryItem;
  pageLink?: string;
}

export default function LibraryListItem(props: IProps) {
  return (
    <Card
      variant="outlined"
      style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
      key={props.libraryItem.id}
    >
      <Link
        style={CommonStyles.link}
        to={`/${props.pageLink}/${props.libraryItem.id}`}
      >
        <CardMedia
          sx={{ width: 60, height: 60, marginLeft: 2 }}
          image={props.libraryItem.imageUrl}
        />
      </Link>
      <CardContent>
        <Link
          style={CommonStyles.link}
          to={`/${props.pageLink}/${props.libraryItem.id}`}
        >
          <Typography component="div" variant="h6">
            {props.libraryItem.name} ({props.libraryItem.trackTotal})
          </Typography>
        </Link>
        <MuiLink style={CommonStyles.link} href={props.libraryItem.url}>
          Open in Spotify
        </MuiLink>
      </CardContent>
      <CardActions style={{ marginLeft: "auto" }}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
