import * as React from "react";
import styled from "@emotion/styled";
import { color } from "src/styles";
import { up } from "styled-breakpoints";
import { useContext } from "react";
import { DrawerContext } from "@/context/Drawer";

type Props = {
  tableOfContents: string;
};

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0;
  transition: all ease-in-out 0.5s;

  &[data-on="true"] {
    opacity: 1;
  }

  ${up("lg")} {
    display: none !important;
  }
`;

const StyledToc = styled.div`
  a {
    display: block;
    margin: 4px 0;
    color: ${color.grey300};

    &:hover {
      color: ${color.grey900};
    }
  }

  ul li ul li a {
    padding-left: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const TocDrawer: React.FC<Props> = ({ tableOfContents }) => {
  const { openedDrawer, toggleDrawer } = useContext(DrawerContext);

  if (!openedDrawer) return <></>;

  return (
    <FullScreen data-on={openedDrawer}>
      <CloseButton onClick={toggleDrawer}>✖️</CloseButton>
      <h3 className='text-xl'>目次</h3>
      <StyledToc
        onClick={toggleDrawer}
        dangerouslySetInnerHTML={{ __html: tableOfContents }}
      />
    </FullScreen>
  );
};

export default TocDrawer;
