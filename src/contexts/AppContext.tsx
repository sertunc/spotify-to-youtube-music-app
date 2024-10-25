import React, { createContext, useContext, useState } from "react";
import { LibraryItemType } from "../spotfiy/models/LibraryItemType";

interface AppContextType {
  libraryItemType: LibraryItemType;
  spotifyItemId: string;
  spotifyItemName: string;
  spotifyToken: string;
  ytMusicItemId: string;
  clearLibraryItemType: () => void;
  setSpotifyToken: (spotifyToken: string) => void;
  setSpotifyItemId: (
    spotifyItemId: string,
    spotifyItemName: string,
    libraryItemType: LibraryItemType
  ) => void;
  setYtMusicItemId: (ytMusicItemId: string) => void;
}

interface AppContextStateType {
  libraryItemType: LibraryItemType;
  spotifyItemId: string;
  spotifyItemName: string;
  spotifyToken: string;
  ytMusicItemId: string;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [appContextState, setAppContextState] = useState<AppContextStateType>({
    libraryItemType: LibraryItemType.NONE,
    spotifyItemId: "",
    spotifyItemName: "",
    spotifyToken: "",
    ytMusicItemId: "",
  });

  const setSpotifyToken = (spotifyToken: string) => {
    setAppContextState({ ...appContextState, spotifyToken });
  };

  const setSpotifyItemId = (
    spotifyItemId: string,
    spotifyItemName: string,
    libraryItemType: LibraryItemType
  ) => {
    setAppContextState({
      ...appContextState,
      libraryItemType,
      spotifyItemId,
      spotifyItemName,
    });
  };

  const setYtMusicItemId = (ytMusicItemId: string) => {
    setAppContextState({ ...appContextState, ytMusicItemId });
  };

  const clearLibraryItemType = () => {
    setAppContextState({ ...appContextState, libraryItemType: LibraryItemType.NONE });
  };

  const value: AppContextType = {
    libraryItemType: appContextState.libraryItemType,
    spotifyItemId: appContextState.spotifyItemId,
    spotifyItemName: appContextState.spotifyItemName,
    spotifyToken: appContextState.spotifyToken,
    ytMusicItemId: appContextState.ytMusicItemId,
    clearLibraryItemType,
    setSpotifyItemId,
    setSpotifyToken,
    setYtMusicItemId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
