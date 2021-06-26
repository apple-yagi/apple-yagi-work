import * as React from "react";
import { Link } from "gatsby";

type Props = {
  previous: GatsbyTypes.Maybe<{
    readonly fields: GatsbyTypes.Maybe<Pick<GatsbyTypes.Fields, "slug">>;
    readonly frontmatter: GatsbyTypes.Maybe<
      Pick<GatsbyTypes.Frontmatter, "title">
    >;
  }>;
  next: GatsbyTypes.Maybe<{
    readonly fields: GatsbyTypes.Maybe<Pick<GatsbyTypes.Fields, "slug">>;
    readonly frontmatter: GatsbyTypes.Maybe<
      Pick<GatsbyTypes.Frontmatter, "title">
    >;
  }>;
};

const BlogNavigation: React.FC<Props> = ({ previous, next }) => {
  return (
    <nav>
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
  );
};

export default BlogNavigation;
