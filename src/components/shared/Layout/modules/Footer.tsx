import { color } from "@/styles";
import styled from "@emotion/styled";
import * as React from "react";
import { up } from "styled-breakpoints";

const StyledFooter = styled.footer`
  width: 100%;
  margin-top: 30px;
  padding: 50px 20px;
  background-image: linear-gradient(#f5f5fa, #fff);
  color: ${color.grey700};

  ${up("xl")} {
    padding: 50px 150px;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      © Yanagi {new Date().getFullYear()}
      <br /> Built with
      {` `}
      <a href='https://www.gatsbyjs.com'>Gatsby</a>
    </StyledFooter>
  );
};

export default Footer;
