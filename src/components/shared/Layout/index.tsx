import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import Navigation from "./modules/Navigation";
import Footer from "./modules/Footer";
import { up } from "styled-breakpoints";
import { theme } from "@/styles";
import styled from "@emotion/styled";

type Props = {
  location: typeof window.location;
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div data-is-root-path={isRootPath}>
      <ThemeProvider theme={theme}>
        <Navigation isRootPath={isRootPath} />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
