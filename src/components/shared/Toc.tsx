import styled from "@emotion/styled";
import * as React from "react";
import { color } from "src/styles";

type Props = {
  tableOfContents: string;
};

const StyledStickyContainer = styled.div`
  height: 100%;
`;

const StyledSticky = styled.div`
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
`;

const StyledToc = styled.div`
  padding: 20px;
  background-color: ${color.grey100};
  border-radius: 12px;

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

const Toc: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <StyledStickyContainer>
      <StyledSticky>
        <StyledToc dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </StyledSticky>
    </StyledStickyContainer>
  );
};

export default Toc;
