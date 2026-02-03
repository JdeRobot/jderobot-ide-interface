import styled from "styled-components";

interface StyledLocalVideoProps {
  roundness?: number;
  position?: string;
}

const handlePosition = (p: StyledLocalVideoProps) => {
  switch (p.position) {
    case "start":
      return `justify-content: start; align-items: start;`;
    case "end":
      return `justify-content: end; align-items: end;`;
    default:
      return `justify-content: center; align-items: center;`;
  }
};

export const StyledLocalVideo = styled.video<StyledLocalVideoProps>`
  display: flex;
  ${handlePosition}

  & iframe {
    border-radius: ${(p) => p.roundness ?? 1}px;
  }
`;
