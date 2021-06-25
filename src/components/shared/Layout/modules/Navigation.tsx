import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import { StyledContainer } from "src/styles";
import useWindowSize from "@/hooks/useWindowSize";
import { up } from "styled-breakpoints";

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
  padding-left: 15px;

  ${up("md")} {
    padding: 0;
  }
`;

type Props = {
  isRootPath: boolean;
};

const Navigation: React.FC<Props> = ({ isRootPath }) => {
  if (isRootPath) return <></>;

  const { windowSize } = useWindowSize();

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
      </CustomContainer>
    </StyledNav>
  );
};

export default Navigation;
