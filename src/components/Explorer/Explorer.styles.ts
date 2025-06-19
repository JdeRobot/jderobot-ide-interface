import styled from "styled-components";

const primaryColor = "#666";

export const StyledSidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
`;

export const StyledSidebarEntry = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
`;

interface StyledSidebarEntryMenuProps {
  bgColor?: string;
}

export const StyledSidebarEntryMenu = styled.div<StyledSidebarEntryMenuProps>`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px 0 10px;
  gap: 5px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

