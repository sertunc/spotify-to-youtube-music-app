import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#c62828",
    },
    secondary: {
      main: "#3cbf3c",
    },
    error: {
      main: red.A400,
    },
  },
});

export default Theme;
