import { css } from "@emotion/react";
import { up } from "styled-breakpoints";
import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  max-width: 1024px;
  margin: auto;
`;

export const StyledCentering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type FlexDirectionProps = {
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
};

const dynamicFlexDirection = (props: FlexDirectionProps) =>
  css`
    flex-direction: ${props.flexDirection || "row"};
  `;

export const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${dynamicFlexDirection}
`;
