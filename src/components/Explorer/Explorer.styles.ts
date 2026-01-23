import styled from "styled-components";

const primaryColor = "#666";

export const StyledSidebarContainer = styled.div`
  margin-right: 2.5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
`;

interface StyledSidebarEntryMenuProps {
  bgColor?: string;
}

export const StyledSidebarEntry = styled.div<StyledSidebarEntryMenuProps>`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-right: 2.5px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

export const StyledSidebarEntryMenu = styled.div<StyledSidebarEntryMenuProps>`
  display: flex;
  align-items: center;
  height: 32px;
  min-height: 32px;
  padding: 0 10px 0 10px;
  gap: 5px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;
