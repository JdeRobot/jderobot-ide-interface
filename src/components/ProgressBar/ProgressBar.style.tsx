import styled from "styled-components";

const primaryColor = "#666";

interface StyledProgressBarProps {
  text?: string;
  color?: string;
  bgColor?: string;
  roundness?: number;
  progress?: number;
}

export const StyledModalCardsEntry = styled.div<StyledProgressBarProps>`
  height: 20px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 50}px;

  & div {
    height: 100%;
    width: ${(p) => p.progress ?? 0}%;
    background-color: ${(p) => p.color ?? primaryColor};
    border-radius: inherit;
    text-align: right;
    & span {
      padding: 5px;
      color: ${(p) => p.text ?? primaryColor};
      font-weight: bold;
    }
  }
`;
