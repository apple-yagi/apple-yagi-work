import { useCallback, useState } from "react";

export default function useDrawer() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpenedDrawer(prevState => !prevState);
  }, [openedDrawer]);

  return { openedDrawer, toggleDrawer };
}
