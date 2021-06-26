import * as React from "react";
import styled from "@emotion/styled";
import { graphql, PageProps } from "gatsby";
import { up } from "styled-breakpoints";
import Bio from "@/components/shared/Bio";
import Layout from "src/components/shared/Layout";
import Seo from "src/components/shared/Seo";
import BlogCard from "@/components/organisms/blog/BlogCard";
import { StyledContainer, color } from "src/styles";

const StyledHeader = styled.header`
  background-image: linear-gradient(#fff, #f5f5fa);
  height: 300px;
  margin: 50px 0 420px;
  padding: 0 30px;

  ${up("lg")} {
    background-image: linear-gradient(#fff, #f5f5fa);
    height: 200px;
    margin: 0 0 250px;
  }
`;

const StyledBioWrapper = styled(StyledContainer)`
  margin-top: 30px;
  max-width: 650px;
  height: 650px;
  background: ${color.baseGrey};
  border-radius: 25px;
  box-shadow: 10px 10px 30px #b6b6c4, -10px -10px 30px #f6f6ff;

  ${up("lg")} {
    max-width: 1024px;
    height: 350px;
    margin-top: 70px;
  }
`;

const CustomContainer = styled(StyledContainer)`
  padding: 0 20px;

  ${up("sm")} {
    padding: 0 50px;
  }

  ${up("lg")} {
    padding: 0 60px;
  }
`;

const StyledSpan = styled.span`
  font-size: 24px;
  color: ${color.grey700};
`;

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location
}) => {
  const blogs = data.allMarkdownRemark.nodes;

  if (blogs.length === 0) {
    return (
      <Layout location={location}>
        <Seo title='Blogs' />
        <StyledHeader>
          <StyledBioWrapper>
            <Bio />
          </StyledBioWrapper>
        </StyledHeader>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <Seo title='Blogs' />
      <StyledHeader>
        <StyledBioWrapper>
          <Bio />
        </StyledBioWrapper>
      </StyledHeader>
      <CustomContainer>
        <StyledSpan>Blogs</StyledSpan>
        <hr />
        <ol style={{ listStyle: `none` }}>
          {blogs.map(blog => {
            if (!blog.frontmatter) return;
            if (!blog.fields) return;

            return (
              <li key={blog.fields.slug}>
                <BlogCard blog={blog} />
              </li>
            );
          })}
        </ol>
      </CustomContainer>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`;
