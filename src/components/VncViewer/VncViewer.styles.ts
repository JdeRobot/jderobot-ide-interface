import styled from "styled-components";

const primaryColor = "#007bff";

interface StyledVNCViewerProps {
  bgColor?: string;
}

export const StyledVNCViewer = styled.div<StyledVNCViewerProps>`
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

export const StyledVNCViewerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledVNCScreen = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

interface StyledVNCMsgProps {
  color?: string;
}

export const StyledVNCMsg = styled.h3<StyledVNCMsgProps>`
  color: ${(p) => p.color ?? primaryColor};
`;