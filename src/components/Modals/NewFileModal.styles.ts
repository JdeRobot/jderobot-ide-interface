import styled from "styled-components";

const primaryColor = "#666";

export const StyledModalCardsTitle = styled.label`
  width: 100%;
  display: block;
  border: none;
  font-size: large;
  font-weight: bold;
  text-align: center;
  margin: 10px 0px;
`;

export const StyledModalCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

interface StyledModalCardsEntryProps {
  hoverColor?: string;
  selectedColor?: string;
  color?: string;
  roundness?: number;
  active?: boolean;
}

const handleActive = (p: StyledModalCardsEntryProps) => {
  if (p.active) {
    return `
      & div {
        background-color: ${p.selectedColor ?? primaryColor} !important;
      }
    `;
  }
};

export const StyledModalCardsEntry = styled.div<StyledModalCardsEntryProps>`
  float: left;
  width: 30%;
  border-radius: ${(p) => p.roundness ?? 1}px;

  & div {
    border-radius: ${(p) => p.roundness ?? 1}px;
    cursor: pointer;
    text-align: center;
    margin: 3px;
    padding: 5px;

    & svg {
      height: 90px;
      width: 100%;
    }
  }

  &:hover div {
    background-color: ${(p) => p.hoverColor ?? primaryColor};
  }

  & p {
    margin: 3px !important;
    color: ${(p) => p.color ?? primaryColor};
  }

  & input[type="radio"] {
    display: none;
    z-index: 100;
  }

  ${handleActive}
`;
