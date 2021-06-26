import * as React from "react";
import styled from "@emotion/styled";
import { color, StyledContainer } from "src/styles";
import { up } from "styled-breakpoints";

type Props = {
  blog: Pick<
    GatsbyTypes.MarkdownRemark,
    "html" | "id" | "excerpt" | "tableOfContents"
  > & {
    readonly frontmatter: GatsbyTypes.Maybe<
      Pick<GatsbyTypes.Frontmatter, "title" | "date" | "ogp">
    >;
  };
};

const StyledHeader = styled.header`
  width: 100%;
  padding-top: 80px;

  ${up("lg")} {
    padding-top: 100px;
  }
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${color.grey800};

  ${up("md")} {
    font-size: 28px;
  }
`;

const StyledDate = styled.p`
  font-size: 14px;
  color: ${color.grey600};

  ${up("md")} {
    font-size: 16px;
  }
`;

const BlogHeader: React.FC<Props> = ({ blog }) => {
  return (
    <StyledHeader>
      <StyledContainer className='text-center'>
        <StyledTitle className='' itemProp='headline'>
          {blog.frontmatter?.title}
        </StyledTitle>
        <StyledDate>{blog.frontmatter?.date}</StyledDate>
      </StyledContainer>
    </StyledHeader>
  );
};

export default BlogHeader;
