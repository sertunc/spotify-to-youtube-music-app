import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          textAlign="center"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Metarial ui example
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
