import * as React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  StyledContainer,
  StyledCentering,
  StyledFlex,
  color
} from "src/styles";

const StyledBio = styled.div`
  background-image: linear-gradient(#fff, #f5f5fa);
  height: 300px;
`;

const CustomContainer = styled(StyledContainer)`
  height: 100%;
`;

const StyledLink = styled.a`
  border-radius: 9999px;
  background-color: ${color.baseWhite};
  padding: 3px;
  margin: 4px;
  opacity: 0.6;
  transition: 1s opacity;
  &:hover {
    opacity: 1;
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
        <StyledCentering>
          <StyledFlex flexDirection='column'>
            <StaticImage
              src='../../../static/images/profile.jpg'
              alt='Author'
              placeholder='blurred'
              layout='fixed'
              width={200}
              height={200}
              imgStyle={{
                borderRadius: "9999px",
                width: 200,
                margin: "0 auto"
              }}
            />
            {author?.name && (
              <StyledFlex flexDirection='column'>
                <div className='text-center'>
                  <p className='text-3xl'>
                    <strong>{author.name}</strong>
                  </p>
                  <p>{author?.summary || null}</p>
                </div>
                <div className='flex'>
                  <StyledLink
                    href={`https://twitter.com/${social?.twitter || ``}`}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <StaticImage
                      className='rounded-full'
                      src='../../../static/images/twitter.png'
                      alt='twitter'
                      width={28}
                      height={28}
                    />
                  </StyledLink>
                  <StyledLink
                    href={`https://github.com/${social?.github || ``}`}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <StaticImage
                      className='rounded-full'
                      src='../../../static/images/github.png'
                      alt='github'
                      width={28}
                      height={28}
                    />
                  </StyledLink>
                </div>
              </StyledFlex>
            )}
          </StyledFlex>
        </StyledCentering>
      </CustomContainer>
    </StyledBio>
  );
};

export default Bio;
