import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { StyledContainer } from "src/styles";

const StyledHeader = styled.header`
  max-width: 1024px;
  margin: auto;
`;

type Props = {
  isRootPath: boolean;
  title: string;
};

const Header: React.FC<Props> = ({ isRootPath, title }) => {
  return (
    <StyledHeader>
      <StyledContainer>
        <Link to='/'>{title}</Link>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
