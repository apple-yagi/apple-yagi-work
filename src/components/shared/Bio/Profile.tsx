import * as React from "react";
import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";
import { StyledFlex, color } from "src/styles";

type Props = {
  author?: GatsbyTypes.Maybe<Pick<GatsbyTypes.Author, "summary" | "name">>;
  social?: GatsbyTypes.Maybe<Pick<GatsbyTypes.Social, "twitter" | "github">>;
};

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

const Profile: React.FC<Props> = ({ author, social }) => {
  return (
    <StyledFlex className='mb-5 lg:mb-0' flexDirection='column'>
      <StaticImage
        src='../../../../static/images/profile.jpg'
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
                src='../../../../static/images/twitter.png'
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
                src='../../../../static/images/github.png'
                alt='github'
                width={28}
                height={28}
              />
            </StyledLink>
          </div>
        </StyledFlex>
      )}
    </StyledFlex>
  );
};

export default Profile;
