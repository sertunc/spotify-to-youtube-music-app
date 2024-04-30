import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IProps {
  titleMessage: string;
  contentMessage: string;
  open: boolean;
  onClose: () => void;
  onYesClick: () => void;
}

export default function CustomYesNoDialog(props: IProps) {
  return props.open === true ? (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.titleMessage}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          variant="contained"
          color="primary"
          autoFocus
        >
          NO
        </Button>
        <Button onClick={props.onYesClick} variant="contained" color="primary">
          YES
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
