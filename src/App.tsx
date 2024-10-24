import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Layout from "./common/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <SnackbarProvider>
          <Layout />
        </SnackbarProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}
