import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { color } from "@/styles";

type Props = {
  blog: Pick<GatsbyTypes.MarkdownRemark, "excerpt"> & {
    readonly fields: GatsbyTypes.Maybe<Pick<GatsbyTypes.Fields, "slug">>;
    readonly frontmatter: GatsbyTypes.Maybe<
      Pick<GatsbyTypes.Frontmatter, "title" | "date">
    >;
  };
};

const StyledArticle = styled.article`
  border-radius: 20px;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 8%);
  padding: 10px 15px;
  margin: 20px 0;
  transition: box-shadow ease-in-out 0.5s;

  &:hover {
    box-shadow: 0px 7px 15px rgb(0 0 0 / 8%);
  }
`;

const StyledH2 = styled.h2`
  font-size: 16px;
`;

const StyledSmall = styled.small`
  color: ${color.grey600};
  font-size: 14px;
`;

const StyledP = styled.p`
  font-size: 14px;
  padding-top: 6px;
`;

const BlogCard: React.FC<Props> = ({ blog }) => {
  const title = blog.frontmatter?.title || blog.fields?.slug;

  return (
    <Link to={blog.fields?.slug as string} itemProp='url'>
      <StyledArticle itemScope itemType='http://schema.org/Article'>
        <header>
          <StyledH2>
            <span itemProp='headline'>{title}</span>
          </StyledH2>
          <StyledSmall>{blog.frontmatter?.date}</StyledSmall>
        </header>
        <hr />
        <section>
          <StyledP
            dangerouslySetInnerHTML={{ __html: blog.excerpt as string }}
            itemProp='description'
          />
        </section>
      </StyledArticle>
    </Link>
  );
};

export default BlogCard;
