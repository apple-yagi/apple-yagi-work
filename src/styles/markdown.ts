import styled from "@emotion/styled";
import { up } from "styled-breakpoints";

export const StyledMarkdown = styled.section`
  h1 {
    font-size: 24px;
    line-height: 1.2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;
    text-decoration: underline;

    &::before {
      display: block;
      content: " ";
      margin-top: -60px;
      height: 60px;
      visibility: hidden;
      pointer-events: none;
    }

    ${up("lg")} {
      font-size: 26px;
    }
  }

  h2 {
    font-size: 22px;
    line-height: 1.2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;

    &::before {
      display: block;
      content: " ";
      margin-top: -60px;
      height: 60px;
      visibility: hidden;
      pointer-events: none;
    }

    ${up("lg")} {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 20px;
    line-height: 2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;

    &::before {
      display: block;
      content: " ";
      margin-top: -60px;
      height: 60px;
      visibility: hidden;
      pointer-events: none;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin: 1em 0;
  }

  ol,
  ul {
    margin: 1em 0;
    padding-left: 40px;
    list-style-type: disc;
  }

  a {
    color: #0f83fd;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    ${up("lg")} {
      font-size: 16px !important;
    }
  }
`;
