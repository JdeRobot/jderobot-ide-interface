import styled from "styled-components";

const primaryColor = "#666";

export const StyledButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 5px;
`;

interface StyledSeparatedButtonsContainerProps {
  color?: string;
}

export const StyledSeparatedButtonsContainer = styled.div<StyledSeparatedButtonsContainerProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 5px;
  border-left: 1px solid ${(p) => p.color ?? primaryColor};
`;
