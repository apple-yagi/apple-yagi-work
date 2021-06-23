import styled from "@emotion/styled";
import { up } from "styled-breakpoints";

export const StyledMarkdown = styled.section`
  h1 {
    font-size: 22px;
    line-height: 1.2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;

    ${up("lg")} {
      font-size: 24px;
    }
  }

  h2 {
    font-size: 18px;
    line-height: 1.2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;

    ${up("lg")} {
      font-size: 20px;
    }
  }

  h3 {
    font-size: 16px;
    line-height: 2;
    font-weight: bold;
    margin: 1.6em 0 0.4em 0;

    ${up("lg")} {
      font-size: 18px;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    margin: 1em 0;

    ${up("lg")} {
      font-size: 16px;
    }
  }
`;
