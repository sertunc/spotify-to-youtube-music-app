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
  showDelete: boolean;
  handleDelete?: (id: string) => void;
}

export default function LibraryListItem(props: IProps) {
  return (
    <Card
      variant="outlined"
      style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
      key={props.libraryItem.id}
    >
      <MuiLink
        style={CommonStyles.link}
        href={`/${props.pageLink}/${props.libraryItem.id}`}
      >
        <CardMedia
          sx={{ width: 60, height: 60, marginLeft: 2 }}
          image={props.libraryItem.imageUrl}
        />
      </MuiLink>
      <CardContent>
        <MuiLink
          style={CommonStyles.link}
          href={`/${props.pageLink}/${props.libraryItem.id}`}
        >
          <Typography component="div" variant="h6">
            {props.libraryItem.name} ({props.libraryItem.trackTotal})
          </Typography>
        </MuiLink>
        <MuiLink style={CommonStyles.link} href={props.libraryItem.url}>
          Open in Spotify
        </MuiLink>
      </CardContent>
      {props.showDelete && (
        <CardActions style={{ marginLeft: "auto" }}>
          {props.handleDelete && (
            <IconButton
              onClick={() =>
                props.handleDelete && props.handleDelete(props.libraryItem.id)
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
}
