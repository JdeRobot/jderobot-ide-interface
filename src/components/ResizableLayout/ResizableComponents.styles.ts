import { Resizable } from "re-resizable"
import styled from "styled-components"

const primaryColor = "#007bff"

interface StyledResizableHorizProps {
  color?: string
  hover?: string
}

export const StyledResizableHoriz = styled(Resizable)<StyledResizableHorizProps>`
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

export const StyledResizableVert = styled(Resizable)<StyledResizableVertProps>`
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

interface StyledHorizFillerContinerProps {
  bgColor?: string
}

export const StyledHorizFillerContiner = styled.div<StyledHorizFillerContinerProps>`
  position: relative;
  user-select: auto;
  height: auto;
  max-width: 100%;
  min-width: 0%;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 1;
  z-index: 1;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`

interface StyledVertContinerProps {
  bgColor?: string
}

export const StyledVertContiner = styled.div<StyledVertContinerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  z-index: 3;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`

interface StyledVertFillerContinerProps {
  bgColor?: string
}

export const StyledVertFillerContiner = styled.div<StyledVertFillerContinerProps>`
  position: relative;
  user-select: auto;
  width: auto;
  max-height: 100%;
  min-height: 0%;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 1;
  z-index: 1;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`