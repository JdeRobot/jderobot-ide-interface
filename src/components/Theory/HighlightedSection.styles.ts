import styled from "styled-components";

const primaryColor = "#666";

interface StyledHighlightContainerProps {
  bg?: string;
  color?: string;
  roundness?: number;
}

export const StyledHighlightContainer = styled.p<StyledHighlightContainerProps>`
  position: relative;
  background-color: ${(p) => p.bg ?? primaryColor};
  color: ${(p) => p.color ?? primaryColor};
  padding: 1rem 2.5rem 1rem 1rem;
  border-radius: ${(p) => p.roundness ?? 1}px;

  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;

  & svg {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 1.4rem;
    pointer-events: none;
  }
`;
