import styled from "styled-components";

const bgColor = "#f5f5f5";
const primaryColor = "#000";

interface StyledFormulaContainerProps{
    bg?: string;
  color?: string;
}

export const StyledFormulaContainer = styled.p<StyledFormulaContainerProps>`
  display: block;
  width: fit-content;
  margin: 1rem auto;
  color: ${(p) => p.color ?? primaryColor};
  background-color: ${(p) => p.bg ?? bgColor};
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;