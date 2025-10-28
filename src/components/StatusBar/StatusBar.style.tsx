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
    margin: 0 0 0 0;
  }
`;

interface StyledStatusBarButtonProps {
  text?: string;
  bgColor?: string;
  hoverColor?: string;
  animate?: boolean;
}

const handleAnimation = (p: StyledStatusBarButtonProps) => {
  if (p.animate) {
    return `
      animation: pulse 3s infinite;
      z-index:100000;

      @keyframes pulse {
        0% {
          box-shadow: unset;
        }

        50% {
          box-shadow: -10px 10px 35px 15px ${p.hoverColor ?? primaryColor};
          background-color: ${p.hoverColor ?? primaryColor};
        }

        100% {
          box-shadow: unset;
        }
      }
    `;
  }
};

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
    margin: 0 0 0 0;
  }

  & svg {
    height: 24px;
    margin: 0 0 0 0;
  }
  ${handleAnimation}
`;
