import styled from "styled-components";

const primaryColor = "#666";

export const StyledTimelineComparisonContent = styled.div`
  display: grid;
  grid-template-columns: auto 10rem;
  gap: 2rem;
  margin: 0 2rem;
`;

export const StyledTimelineComparisonContentContainer = styled.div`
  max-width: 80%;
  min-width: 80%;
  justify-self: center;
`;

export const StyledTimelineComparisonTabsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-self: stretch;
`;

interface StyledTimelineComparisonControlsProps {
  color?: string;
  accent?: string;
}

export const StyledTimelineComparisonControls = styled.div<StyledTimelineComparisonControlsProps>`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: center;

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

interface StyledTimelineComparisonDescProps {
  color?: string;
  bg?: string;
  roundness?: number;
}

export const StyledTimelineComparisonDesc = styled.div<StyledTimelineComparisonDescProps>`
  color: ${(p) => p.color ?? primaryColor};
  background-color: ${(p) => p.bg ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;

  margin-top: 0.8rem;
  padding: 0.8rem;
  box-shadow:
    inset 0 1px 2px #ffffff30,
    0 1px 2px #00000030,
    0 2px 4px #00000015;

  font-size: 1rem;
  line-height: 1.4rem;
  height: calc(1.4rem * 5);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  justify-content: center;
  text-align: center;

  & p {
    margin: 0;
    line-height: 1.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: auto;
    white-space: pre-line;
  }
`;
