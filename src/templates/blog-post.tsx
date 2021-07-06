import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { up } from "styled-breakpoints";
import NotFoundPage from "@/pages/404";
import Layout from "@/components/shared/Layout";
import Seo from "@/components/shared/Seo";
import Toc from "@/components/shared/Toc";
import TocDrawer from "@/components/shared/TocDrawer";
import BlogHeader from "@/components/organisms/blog/BlogHeader";
import BlogNavigation from "@/components/organisms/blog/BlogNavigation";
import styled from "@emotion/styled";
import { color, StyledMarkdown, StyledFlex, StyledContainer } from "src/styles";
import SmallBio from "@/components/shared/SmallBio";

const StyledArticle = styled.article`
  width: 100%;
  padding: 0 20px;

  ${up("md")} {
    padding: 0 30px;
  }

  ${up("lg")} {
    width: calc(100% - 300px);
    background-color: ${color.grey100};
    border-radius: 12px;
  }
`;

const CustomFlex = styled(StyledFlex)`
  align-items: initial;
  padding-top: 10px;

  ${up("md")} {
    padding-top: 20px;
  }
`;

const StyledAside = styled.aside`
  display: none !important;

  ${up("lg")} {
    display: block !important;
    width: 300px;
    padding-left: 30px;
  }
`;

const BlogPostTemplate: React.FC<PageProps<GatsbyTypes.BlogPostBySlugQuery>> =
  ({ data, location }) => {
    const blog = data.markdownRemark;
    const { previous, next } = data;

    if (!blog) return <NotFoundPage />;

    return (
      <Layout location={location}>
        <Seo
          title={blog.frontmatter?.title as string}
          description={blog.frontmatter?.description || blog.excerpt}
          image={blog.frontmatter?.ogp}
        />
        <BlogHeader blog={blog} />
        <hr className='mt-7' />
        <StyledContainer>
          <CustomFlex>
            <StyledArticle itemScope itemType='http://schema.org/Article'>
              <StyledMarkdown
                dangerouslySetInnerHTML={{ __html: blog.html as string }}
                itemProp='articleBody'
              />
            </StyledArticle>
            <StyledAside>
              <SmallBio />
              <Toc tableOfContents={blog.tableOfContents as string} />
            </StyledAside>
            <TocDrawer tableOfContents={blog.tableOfContents as string} />
          </CustomFlex>
          <hr className='my-5' />
          <BlogNavigation previous={previous} next={next} />
        </StyledContainer>
      </Layout>
    );
  };

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        ogp
      }
      tableOfContents
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
