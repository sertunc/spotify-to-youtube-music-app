import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  itemId: string;
}

const AppContext = createContext<any>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appContext, setAppContext] = useState<AppContextType>({
    itemId: "",
  });

  const setItemId = (itemId: string) => {
    setAppContext({
      ...appContext,
      itemId,
    });
  };

  const value = {
    setItemId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useSnackbar = () => {
  return useContext(AppContext);
};
