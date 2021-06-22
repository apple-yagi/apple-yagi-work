import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import NotFoundPage from "../pages/404";
import Bio from "../components/shared/Bio";
import Layout from "../components/shared/Layout";
import Seo from "../components/shared/Seo";

const BlogPostTemplate: React.FC<PageProps<GatsbyTypes.BlogPostBySlugQuery>> =
  ({ data, location }) => {
    const blog = data.markdownRemark;
    const siteTitle = data.site?.siteMetadata?.title || `Title`;
    const { previous, next } = data;

    if (!blog) return <NotFoundPage />;

    return (
      <Layout location={location} title={siteTitle}>
        <Seo
          title={blog.frontmatter?.title as string}
          description={blog.frontmatter?.description || blog.excerpt}
        />
        <article
          className='blog-post'
          itemScope
          itemType='http://schema.org/Article'>
          <header>
            <h1 itemProp='headline'>{blog.frontmatter?.title}</h1>
            <p>{blog.frontmatter?.date}</p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: blog.html as string }}
            itemProp='articleBody'
          />
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>
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
    site {
      siteMetadata {
        title
      }
    }
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
