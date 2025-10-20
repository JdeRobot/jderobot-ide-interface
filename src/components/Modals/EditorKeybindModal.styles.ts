import styled from "styled-components";
import { contrastSelector } from "Utils";

interface StyledModalEditorKeybindProps {
  lightText?: string;
  darkText?: string;
  bg?: string;
}

const handleVariant = (p: StyledModalEditorKeybindProps) => {
  return `
    color: ${contrastSelector(p.lightText, p.darkText, p.bg)};
  `;
};

export const StyledModalEditorKeybind = styled.div<StyledModalEditorKeybindProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${handleVariant}
`;
