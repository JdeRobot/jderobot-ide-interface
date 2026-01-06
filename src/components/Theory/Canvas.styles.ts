import styled from "styled-components";

const primaryColor = "#666";

interface StyledCanvasProps {
  bg?: string;
  roundness?: number;
}

export const StyledCanvas = styled.canvas<StyledCanvasProps>`
  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;
  border-radius: ${(p) => p.roundness ?? 1}px;
  background-color: ${(p) => p.bg ?? primaryColor};
`;
