import styled from "styled-components";

const primaryColor = "#666";

interface StyledImageContainerProps {
  roundness?: number;
  height?: number;
  color?: string;
}

export const StyledImageContainer = styled.figure<StyledImageContainerProps>`

  & img {
    max-height: ${(p) => p.height ?? 250}px;
    height: auto;
    width: auto;
    border-radius: ${(p) => p.roundness ?? 1}px;
    box-shadow:
      inset 0 1px 2px #ffffff30,
      0 1px 2px #00000030,
      0 2px 4px #00000015;

    display: block;
    margin: 0 auto;
  }

  & figcaption {
    margin-top: 8px;
    font-size: 0.9rem;
    color: ${(p) => p.color ?? primaryColor};
    text-align: center;
    min-height: 1.2em;
    opacity: 0.8;
  }
`;

