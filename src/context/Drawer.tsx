import useDrawer from "@/hooks/useDrawer";
import React, { FC, createContext, ReactNode } from "react";

type DrawerContextProps = {
  openedDrawer: boolean;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextProps>({
  openedDrawer: false,
  toggleDrawer: () => null
});

type DrawerProviderProps = {
  children?: ReactNode;
};

const DrawerProvider: FC = ({ children }: DrawerProviderProps) => {
  const { openedDrawer, toggleDrawer } = useDrawer();

  return (
    <DrawerContext.Provider
      value={{ openedDrawer: openedDrawer, toggleDrawer: toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerContext, DrawerProvider };
