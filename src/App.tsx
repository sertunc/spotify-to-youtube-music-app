import { AppContextProvider } from "./contexts/AppContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Layout from "./common/Layout";

export default function App() {
  return (
    <AppContextProvider>
      <SnackbarProvider>
        <Layout />
      </SnackbarProvider>
    </AppContextProvider>
  );
}
