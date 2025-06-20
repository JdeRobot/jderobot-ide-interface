import styled from "styled-components";

const primaryColor = "#666";

interface StyledStatusBarContainerProps {
  bgColor?: string;
}

export const StyledStatusBarContainer = styled.div<StyledStatusBarContainerProps>`
  height: 24px;
  width: 100%;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  display: flex;
  flex-direction: row;
`;

interface StyledStatusBarEntryProps {
  text?: string;
}

export const StyledStatusBarEntry = styled.div<StyledStatusBarEntryProps>`
  margin: 0 0 0 0;
  padding: 0 10px 0 10px;
  height: 24px;
  min-width: 100px;
  width: fit-content;
  border: none;
  background-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  opacity: 50%;

  &:hover {
    opacity: 100%;
  }

  & label {
    height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    color: ${(p) => p.text ?? primaryColor};
    display: flex;
    align-items: center;
  }
`;

interface StyledStatusBarButtonProps {
  text?: string;
  bgColor?: string;
  hoverColor?: string;
}

export const StyledStatusBarButton = styled.div<StyledStatusBarButtonProps>`
  margin: 0 0 0 0;
  padding: 0 10px 0 10px;
  height: 24px;
  min-width: 100px;
  width: fit-content;
  border: none;
  background-color: ${(p) => p.bgColor ?? "transparent"};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(p) => p.hoverColor ?? primaryColor};
  }

  & label {
    height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 18px;
    color: ${(p) => p.text ?? primaryColor};
    display: flex;
    align-items: center;
  }

  & svg {
    height: 24px;
    margin: 0 0 0 0;
  }
`;