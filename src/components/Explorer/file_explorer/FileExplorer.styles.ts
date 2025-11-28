import styled from "styled-components";

const primaryColor = "#666";

interface BGProps {
  bgColor?: string;
}

export const StyledSidebarEntryContainer = styled.div<BGProps>`
  overflow-y: auto;
  border-radius: 0 20px 20px 0;
  flex-grow: 1;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;
