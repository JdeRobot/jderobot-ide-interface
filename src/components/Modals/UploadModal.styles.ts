import styled from "styled-components";

const primaryColor = "#666";

interface StyledModelDropProps {
  text?: string;
  bgColor?: string;
  hoverColor?: string;
  buttonColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  roundness?: number;
  active?: boolean;
}

const handleActive = (p: StyledModelDropProps) => {
  if (p.active) {
    return `
      background-color: ${p.borderColor ?? primaryColor} !important;
      border-color: ${p.hoverBorderColor ?? primaryColor} !important;
    `;
  }
};

export const StyledModalDrop = styled.label<StyledModelDropProps>`
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
  border-radius: ${(p) => p.roundness ?? 1}px;
  margin-bottom: 10px;
  border: 2px dashed ${(p) => p.borderColor ?? primaryColor};
  color: ${(p) => p.text ?? primaryColor};
  cursor: pointer;
  transition:
    background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  &:hover {
    background: ${(p) => p.borderColor ?? primaryColor};
    border-color: ${(p) => p.hoverBorderColor ?? primaryColor};
  }

  & span {
    color: ${(p) => p.text ?? primaryColor};
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }

  & input {
    width: 350px;
    border: 2px solid ${(p) => p.borderColor ?? primaryColor};
    color: ${(p) => p.text ?? primaryColor};
    font-size: medium;
    background-color: ${(p) => p.bgColor ?? primaryColor};
    border-radius: ${(p) => p.roundness ?? 1}px;
    padding: 5px;
    font-size: medium;
    outline: none;

    &::file-selector-button {
      margin-right: 20px;
      border: none;
      background: ${(p) => p.buttonColor ?? primaryColor};
      padding: 10px 20px;
      border-radius: ${(p) => p.roundness ?? 1}px;
      color: ${(p) => p.text ?? primaryColor};
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    &::file-selector-button:hover {
      background: ${(p) => p.hoverColor ?? primaryColor};
    }
  }

  ${handleActive}
`;
