import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import Bio from "src/components/shared/Bio";
import Layout from "src/components/shared/Layout";
import Seo from "src/components/shared/Seo";
import { StyledContainer } from "src/styles";

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location
}) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const blogs = data.allMarkdownRemark.nodes;

  if (blogs.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title='Blogs' />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title='Blogs' />
      <StyledContainer>
        <ol style={{ listStyle: `none` }}>
          {blogs.map(blog => {
            const title = blog.frontmatter?.title || blog.fields?.slug;
            if (!blog.frontmatter) return;
            if (!blog.fields) return;

            return (
              <li key={blog.fields.slug}>
                <article
                  className='post-list-item'
                  itemScope
                  itemType='http://schema.org/Article'>
                  <header>
                    <h2>
                      <Link to={blog.fields.slug as string} itemProp='url'>
                        <span itemProp='headline'>{title}</span>
                      </Link>
                    </h2>
                    <small>{blog.frontmatter?.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog.excerpt as string
                      }}
                      itemProp='description'
                    />
                  </section>
                </article>
              </li>
            );
          })}
        </ol>
      </StyledContainer>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
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
