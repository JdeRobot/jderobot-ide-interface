import styled from "styled-components";

const primaryColor = "#666";

interface SStyledTimelineContainerProps {
  bg?: string;
  roundness?: number;
}

export const StyledTimelineContainer = styled.div<SStyledTimelineContainerProps>`
  background-color: ${(p) => p.bg ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  padding: 2rem 1rem;
  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;
  margin: 2rem auto;
  text-align: center;
  width: 95%;

  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

interface StyledTimelineTitleProps {
  color?: string;
}

export const StyledTimelineTitle = styled.h3<StyledTimelineTitleProps>`
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: ${(p) => p.color ?? primaryColor};
`;

export const StyledTimelineSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

interface StyledTimelineCardProps {
  bg?: string;
  roundness?: number;
  offset: number;
  hidden?: boolean;
}

const handleOffset = (p: StyledTimelineCardProps) => {
  if (p.offset == 0) {
    return `
      transform: translateX(calc(${p.offset} * 375px - 50%)) scale(1);
      opacity: 1;
      z-index: 3;
      cursor: pointer;

      &:hover {
        transform: translateX(calc(${p.offset} * 375px - 50%)) scale(1.05);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
        z-index: 5;
      }
    `;
  } else if (p.offset == -1 || p.offset == 1) {
    return `
      transform: translateX(calc(${p.offset} * 375px - 50%)) scale(0.9);
      opacity: 0.7;
      z-index: 2;
    `;
  } else {
    return `
      transform: translateX(calc(${p.offset} * 375px - 50%)) scale(0.8);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
    `;
  }
};

const handleVisibility = (p: StyledTimelineCardProps) => {
  if (p.hidden) {
    return `
      visibility: hidden;
      position: relative !important;
    `;
  }
};

export const StyledTimelineCard = styled.div<StyledTimelineCardProps>`
  position: absolute;
  top: 0;
  left: 50%;

  width: 350px;
  min-width: 350px;
  padding: 1rem;

  background-color: ${(p) => p.bg ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  color: ${(p) => p.color ?? primaryColor};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  box-sizing: border-box;
  height: 100%;

  ${handleOffset}
  ${handleVisibility}

  & a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const StyledTimelineControlContainer = styled.div`
  margin-top: 2rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

interface StyledTimelineControlsProps {
  color?: string;
  accent?: string;
}

export const StyledTimelineControls = styled.div<StyledTimelineControlsProps>`
  display: grid;
  align-items: center;
  grid-template-columns: 20% auto 20%;
  width: 100%;
  gap: 0.5rem;

  & label:first-child {
    justify-self: end;
  }

  & label {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${(p) => p.color ?? primaryColor};
    font-size: 0.95rem;
  }

  & input {
    accent-color: ${(p) => p.accent ?? primaryColor};
  }
`;

export const StyledTimelineSubtitle = styled.h3`
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: inherit;
`;

export const StyledTimelineImageDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.3;
  margin: 0;
  padding: 0 0.3rem;
  align-self: start;
`;
