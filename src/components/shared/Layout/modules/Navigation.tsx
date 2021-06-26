import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import { StyledContainer } from "src/styles";
import useWindowSize from "@/hooks/useWindowSize";
import { up } from "styled-breakpoints";
import { DrawerContext } from "@/context/Drawer";

const StyledNav = styled.nav`
  background-image: linear-gradient(#f5f5fa, #fff);
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 99999;
`;

const CustomContainer = styled(StyledContainer)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  ${up("lg")} {
    padding: 0;
  }
`;

const ToggleButton = styled.button`
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }

  ${up("lg")} {
    display: none;
  }
`;

type Props = {
  isRootPath: boolean;
};

const Navigation: React.FC<Props> = ({ isRootPath }) => {
  if (isRootPath) return <></>;

  const { windowSize } = useWindowSize();
  const { toggleDrawer } = React.useContext(DrawerContext);

  return (
    <StyledNav>
      <CustomContainer>
        <Link to='/'>
          {windowSize.width < 600 ? (
            <span>🏠</span>
          ) : (
            <>
              <span>🏠</span>
              <span className='ml-3'>Go back home</span>
            </>
          )}
        </Link>
        <ToggleButton onClick={toggleDrawer}>🔖</ToggleButton>
      </CustomContainer>
    </StyledNav>
  );
};

export default Navigation;
