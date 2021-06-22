import * as React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import { up } from "styled-breakpoints";
import { StyledContainer, StyledCentering, color } from "src/styles";
import Profile from "./Profile";
import GithubReadmeStats from "./GithubReadmeStats";

const StyledBio = styled.div`
  background-image: linear-gradient(#fff, #f5f5fa);
  height: 300px;
  margin: 50px 0 420px;
  padding: 0 30px;

  ${up("lg")} {
    background-image: linear-gradient(#fff, #f5f5fa);
    height: 200px;
    margin: 0 0 250px;
    padding: 0 30px;
  }
`;

const CustomContainer = styled(StyledContainer)`
  margin-top: 30px;
  max-width: 650px;
  height: 650px;
  background: ${color.baseGrey};
  border-radius: 25px;
  box-shadow: 10px 10px 30px #b6b6c4, -10px -10px 30px #f6f6ff;

  ${up("lg")} {
    margin-top: 30px;
    max-width: 1024px;
    height: 350px;
  }
`;

const CustomCentering = styled(StyledCentering)`
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
          }
        }
      }
    }
  `);

  const author = data.site?.siteMetadata?.author;
  const social = data.site?.siteMetadata?.social;

  return (
    <StyledBio>
      <CustomContainer>
        <CustomCentering>
          <Profile author={author} social={social} />
          <GithubReadmeStats />
        </CustomCentering>
      </CustomContainer>
    </StyledBio>
  );
};

export default Bio;
