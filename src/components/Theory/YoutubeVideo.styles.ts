import YouTube from "react-youtube";
import styled from "styled-components";

interface StyledYoutubeProps {
  roundness?: number;
  position?: string;
}

const handlePosition = (p: StyledYoutubeProps) => {
  switch (p.position) {
    case "start":
      return `justify-content: start;`;
    case "end":
      return `justify-content: end;`;
    default:
      return `justify-content: center;`;
  }
};

export const StyledYoutube = styled(YouTube)<StyledYoutubeProps>`
  display: flex;
  ${handlePosition}

  & iframe {
    border-radius: ${(p) => p.roundness ?? 1}px;
  }
`;
