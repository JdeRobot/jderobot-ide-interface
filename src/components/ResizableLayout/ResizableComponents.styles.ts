import styled from "styled-components"

const primaryColor = "#007bff"

interface StyledResizableHorizProps {
  color?: string
  hover?: string
}

export const StyledResizableHoriz = styled.div<StyledResizableHorizProps>`
  .hresize-handle {
    position: absolute;
    width: 5px !important;
    height: 100% !important;
    top: 0 !important;
    right: -2.5px !important;
    cursor: ew-resize !important;
    user-select: none;
    z-index: 99;
    &:hover,
    :active {
      background-color: ${(p) => p.hover ?? primaryColor};
    }
    background-color: ${(p) => p.color ?? primaryColor};
  }
`

interface StyledResizableVertProps {
  color?: string
  hover?: string
}

export const StyledResizableVert = styled.div<StyledResizableVertProps>`
  .vresize-handle {
    position: absolute;
    height: 5px !important;
    width: 100% !important;
    right: 0 !important;
    cursor: ns-resize !important;
    user-select: none;
    z-index: 99;
    &:hover,
    :active {
      background-color: ${(p) => p.hover ?? primaryColor};
    }
    background-color: ${(p) => p.color ?? primaryColor};
  }
`

interface StyledHorizContinerProps {
  bgColor?: string
}

export const StyledHorizContiner = styled.div<StyledHorizContinerProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`