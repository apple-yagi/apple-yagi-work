import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import Header from "./modules/Header";
import Footer from "./modules/Footer";
import { theme } from "@/styles";

type Props = {
  location: typeof window.location;
  title: string;
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div data-is-root-path={isRootPath}>
      <ThemeProvider theme={theme}>
        <Header isRootPath={isRootPath} title={title} />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
