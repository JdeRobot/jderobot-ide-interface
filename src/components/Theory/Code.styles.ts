import styled from "styled-components";

const primaryColor = "#666";

interface StyledTheoryCodeProps {
  bg?: string;
  color?: string;
  roundness?: number;
  border?: string;
}

export const StyledTheoryCode = styled.code<StyledTheoryCodeProps>`
  display: block;
  margin: 10px;
  padding: 24px;
  border-radius: ${(p) => p.roundness ?? 1}px;
  border: 1px solid ${(p) => p.border ?? primaryColor};
  color: ${(p) => p.color ?? primaryColor};
  background-color: ${(p) => p.bg ?? primaryColor};
  position: relative;

  & svg {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    margin: 0;
    opacity: 50%;
    &:hover {
      opacity: 100%;
    }
  }

  & div {
    position: absolute;
    top: 10px;
    right: 35px;
    width: 95px;
    padding-left: 10px;
    height: 35px;
    border-radius: ${(p) => p.roundness ?? 1}px;
    background-color: ${(p) => p.bg ?? primaryColor};
  }
`;
