import * as React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import { up } from "styled-breakpoints";
import { color, StyledFlex, StyledContainer, StyledCentering } from "@/styles";
import TwitterTimeline from "@/components/atoms/TwitterTimeline";
import Profile from "@/components/shared/Bio/Profile";

const StyledFooter = styled.footer`
  width: 100%;
  margin-top: 30px;
  padding: 50px 20px 10px;
  background-image: linear-gradient(#f5f5fa, #fff);
  color: ${color.grey700};

  ${up("lg")} {
    padding: 50px 150px 3px;
  }
`;

const CustomFlex = styled(StyledFlex)`
  flex-direction: column-reverse;

  ${up("lg")} {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Footer: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
    query {
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
    <StyledFooter>
      <StyledContainer>
        <CustomFlex>
          <TwitterTimeline />
          <Profile author={author} social={social} />
        </CustomFlex>
        <hr className='mt-10' />
        <StyledCentering>
          <div>
            © Yanagi {new Date().getFullYear()}
            <br /> Built with
            {` `}
            <a href='https://www.gatsbyjs.com'>Gatsby</a>
          </div>
        </StyledCentering>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
