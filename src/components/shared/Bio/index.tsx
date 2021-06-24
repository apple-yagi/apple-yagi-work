import * as React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import { up } from "styled-breakpoints";
import { StyledCentering } from "src/styles";
import Profile from "./Profile";
import GithubReadmeStats from "./GithubReadmeStats";

const StyledBio = styled(StyledCentering)`
  padding: 0 20px;
  flex-direction: column;

  ${up("lg")} {
    justify-content: space-around;
    flex-direction: row;
  }
`;

const Bio: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            qiita
          }
        }
      }
    }
  `);

  const author = data.site?.siteMetadata?.author;
  const social = data.site?.siteMetadata?.social;

  return (
    <StyledBio>
      <Profile author={author} social={social} />
      <GithubReadmeStats />
    </StyledBio>
  );
};

export default Bio;
