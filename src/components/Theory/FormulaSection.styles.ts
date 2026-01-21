import styled from "styled-components";

const primaryColor = "#666";

interface StyledFormulaContainerProps{
  color?: string;
  bg?: string;
}

export const StyledFormulaContainer = styled.p<StyledFormulaContainerProps>`
  display: block;
  width: fit-content;
  margin: 1rem auto;
  color: ${(p) => p.color ?? primaryColor};
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px #00000026;
  background-color: ${(p) => p.bg ?? primaryColor};
`;