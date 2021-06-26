import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { DrawerProvider } from "@/context/Drawer";
import Navigation from "./modules/Navigation";
import Footer from "./modules/Footer";
import styled from "@emotion/styled";
import { theme } from "@/styles";

type Props = {
  location: typeof window.location;
  children?: React.ReactNode;
};

const StyledMain = styled.main`
  min-height: 100vh;
`;

const Layout: React.FC<Props> = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div data-is-root-path={isRootPath}>
      <DrawerProvider>
        <ThemeProvider theme={theme}>
          <Navigation isRootPath={isRootPath} />
          <StyledMain>{children}</StyledMain>
          <Footer />
        </ThemeProvider>
      </DrawerProvider>
    </div>
  );
};

export default Layout;
