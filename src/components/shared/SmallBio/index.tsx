import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { color } from "@/styles";

const StyledSmallBio = styled.div`
  background-color: ${color.grey100};
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 20px;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;
`;

const StyledLink = styled.a`
  border-radius: 9999px;
  background-color: ${color.baseWhite};
  padding: 3px;
  opacity: 0.6;
  transition: 1s opacity;
  &:hover {
    opacity: 1;
  }

  & + a {
    margin-left: 7px;
  }
`;

const StyledName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const SmallBio: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.SmallBioQueryQuery>(graphql`
    query SmallBioQuery {
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

  const { site } = data;
  const author = site?.siteMetadata?.author;
  const social = site?.siteMetadata?.social;

  return (
    <StyledSmallBio>
      <div className='flex'>
        <StaticImage
          src='../../../../static/images/profile.jpg'
          alt='Author'
          placeholder='none'
          layout='fixed'
          width={60}
          height={60}
          imgStyle={{
            borderRadius: "9999px",
            width: 60
          }}
        />
        <StyledProfile>
          <div>
            <StyledName>{author?.name}</StyledName>
            <div className='flex'>
              <StyledLink
                href={`https://twitter.com/${social?.twitter || ``}`}
                target='_blank'
                rel='noopener noreferrer'>
                <StaticImage
                  className='rounded-full'
                  src='../../../../static/images/twitter.png'
                  alt='twitter'
                  placeholder='none'
                  width={22}
                  height={22}
                />
              </StyledLink>
              <StyledLink
                href={`https://github.com/${social?.github || ``}`}
                target='_blank'
                rel='noopener noreferrer'>
                <StaticImage
                  className='rounded-full'
                  src='../../../../static/images/github.png'
                  alt='github'
                  placeholder='none'
                  width={22}
                  height={22}
                />
              </StyledLink>
              <StyledLink
                href={`https://qiita.com/${social?.qiita || ``}`}
                target='_blank'
                rel='noopener noreferrer'>
                <StaticImage
                  className='rounded-full'
                  src='../../../../static/images/qiita.png'
                  alt='qiita'
                  placeholder='none'
                  width={22}
                  height={22}
                />
              </StyledLink>
            </div>
          </div>
        </StyledProfile>
      </div>
      <p style={{ paddingTop: 10 }}>{author?.summary}</p>
    </StyledSmallBio>
  );
};

export default SmallBio;
