import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { up } from "styled-breakpoints";
import NotFoundPage from "src/pages/404";
import Layout from "src/components/shared/Layout";
import Seo from "src/components/shared/Seo";
import { StyledContainer } from "src/styles";
import styled from "@emotion/styled";
import { color, StyledMarkdown } from "src/styles";

const StyledHeader = styled.header`
  width: 100%;
  padding-top: 80px;

  ${up("lg")} {
    padding-top: 100px;
  }
`;

const StyledArticle = styled.article`
  padding: 20px;
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
        />
        <StyledHeader>
          <StyledContainer className='text-center'>
            <StyledTitle className='' itemProp='headline'>
              {blog.frontmatter?.title}
            </StyledTitle>
            <StyledDate>{blog.frontmatter?.date}</StyledDate>
          </StyledContainer>
        </StyledHeader>
        <hr className='my-7' />
        <StyledContainer>
          <StyledArticle
            className='blog-post'
            itemScope
            itemType='http://schema.org/Article'>
            <StyledMarkdown
              dangerouslySetInnerHTML={{ __html: blog.html as string }}
              itemProp='articleBody'
            />
          </StyledArticle>
          <hr className='my-5' />
          <nav className='blog-post-nav'>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0
              }}>
              <li>
                {previous && (
                  <Link to={previous.fields?.slug as string} rel='prev'>
                    ← {previous.frontmatter?.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields?.slug as string} rel='next'>
                    {next.frontmatter?.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
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
      }
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
