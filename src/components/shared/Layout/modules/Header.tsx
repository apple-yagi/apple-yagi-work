import * as React from "react";
import styled from "@emotion/styled";
import { StyledContainer } from "src/styles";
import { Link } from "gatsby";

const StyledHeader = styled.header`
  background-image: linear-gradient(#f5f5fa, #fff);
  height: 50px;
`;

const CustomContainer = styled(StyledContainer)`
  height: 100%;
`;

type Props = {
  isRootPath: boolean;
  title: string;
};

const Header: React.FC<Props> = ({ isRootPath, title }) => {
  return (
    <StyledHeader>
      <CustomContainer>
        <Link to='/'>{title}</Link>
      </CustomContainer>
    </StyledHeader>
  );
};

export default Header;
