import React, { createContext, useContext, useState } from "react";
import { LibraryItemType } from "../spotfiy/models/LibraryItemType";

interface AppContextType {
  libraryItemType: LibraryItemType;
  spotifyItemId: string;
  ytMusicItemId: string;
  clearLibraryItemType: () => void;
  setSpotifyItemId: (
    spotifyItemId: string,
    libraryItemType: LibraryItemType
  ) => void;
  setYtMusicItemId: (ytMusicItemId: string) => void;
}

interface AppContextStateType {
  libraryItemType: LibraryItemType;
  spotifyItemId: string;
  ytMusicItemId: string;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appContextState, setAppContextState] = useState<AppContextStateType>({
    libraryItemType: LibraryItemType.NONE,
    spotifyItemId: "",
    ytMusicItemId: "",
  });

  const setYtMusicItemId = (ytMusicItemId: string) => {
    setAppContextState({
      ...appContextState,
      ytMusicItemId,
    });
  };

  const setSpotifyItemId = (
    spotifyItemId: string,
    libraryItemType: LibraryItemType
  ) => {
    setAppContextState({
      ...appContextState,
      libraryItemType,
      spotifyItemId,
    });
  };

  const clearLibraryItemType = () => {
    setAppContextState({
      ...appContextState,
      libraryItemType: LibraryItemType.NONE,
    });
  };

  const value: AppContextType = {
    libraryItemType: appContextState.libraryItemType,
    spotifyItemId: appContextState.spotifyItemId,
    ytMusicItemId: appContextState.ytMusicItemId,
    clearLibraryItemType,
    setSpotifyItemId,
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
