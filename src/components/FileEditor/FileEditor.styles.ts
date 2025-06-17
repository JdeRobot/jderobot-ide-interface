import styled from "styled-components"

const primaryColor = "#666"

interface StyledEditorMenuProps {
  bgColor?: string
}

export const StyledEditorMenu = styled.div<StyledEditorMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  height: 32px;
  max-height: 32px;
  width: 100%;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`