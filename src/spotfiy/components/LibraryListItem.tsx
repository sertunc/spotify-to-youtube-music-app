import { useAppContext } from "../../contexts/AppContext";
import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonStyles from "../../common/CommonStyles";
import { LibraryItemType } from "../models/LibraryItemType";

interface IProps {
  libraryItem: LibraryItem;
  libraryItemType: LibraryItemType;
  showDelete: boolean;
  handleDelete?: (id: string) => void;
}

export default function LibraryListItem(props: IProps) {
  const { setSpotifyItemId } = useAppContext();

  return (
    <Card
      variant="outlined"
      style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
      key={props.libraryItem.id}
    >
      <ButtonBase
        onClick={() => {
          setSpotifyItemId(props.libraryItem.id, props.libraryItem.name, props.libraryItemType);
        }}
      >
        <CardMedia
          sx={{ width: 60, height: 60, marginLeft: 2 }}
          image={props.libraryItem.imageUrl}
        />
      </ButtonBase>
      <CardContent>
        <Typography component="div" variant="h6">
          {props.libraryItem.name} ({props.libraryItem.trackTotal})
        </Typography>
        <Link target="_blank" style={CommonStyles.link} href={props.libraryItem.url}>
          Open in Spotify
        </Link>
      </CardContent>
      {props.showDelete && (
        <CardActions style={{ marginLeft: "auto" }}>
          {props.handleDelete && (
            <IconButton
              onClick={() => props.handleDelete && props.handleDelete(props.libraryItem.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
}
