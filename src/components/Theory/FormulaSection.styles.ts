import styled from "styled-components";

const primaryColor = "#666";

interface StyledFormulaContainerProps{
  color?: string;
  bg?: string;
  roundness?: number;
}

export const StyledFormulaContainer = styled.p<StyledFormulaContainerProps>`
  position: relative;
  background-color: ${(p) => p.bg ?? primaryColor};
  color: ${(p) => p.color ?? primaryColor};
  padding: 1rem 1.5rem;
  border-radius: ${(p) => p.roundness ?? 1}px;
  
  display: block;
  width: fit-content;
  margin: 1rem auto;
  text-align: center;

  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;
`;